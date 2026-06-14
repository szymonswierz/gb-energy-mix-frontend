import { useEffect, useState } from "react";
import { EnergyMixPieChart } from "./components/EnergyMixPieChart";
import { OptimalChargingWindow } from "./components/OptimalChargingWindow";
import { getDailyEnergyMix } from "./api/neso";

type EnergySourcePercentage = {
    fuel: string;
    percentage: number;
};

type DailyEnergyMix = {
    date: string;
    energySourcePercentages: EnergySourcePercentage[];
    cleanEnergyPercentage: number;
};

function App() {
    const [data, setData] = useState<DailyEnergyMix[]>([]);
    const [error, setError] = useState<string>("");

    const dayLabels = ["Today", "Tomorrow", "Day After Tomorrow"];

    useEffect(() => {
        getDailyEnergyMix()
            .then(result => {
                setData(result);
            })
            .catch(error => {
                console.error("ERROR:", error);
                setError("Could not load energy mix data.");
            });
    }, []);

    if (error) {
        return <div className="container py-5 text-danger">{error}</div>;
    }

    if (data.length === 0) {
        return <div className="container py-5">Loading...</div>;
    }

    return (
        <main className="container py-4">
            <header className="text-center">
                <h1 className="display-5 fw-bold mb-4">
                    Great Britain Energy Mix
                </h1>

                <p className="mb-4">
                    This dashboard shows the energy mix in Great Britain
                    for today, tomorrow and the day after tomorrow.
                </p>

                <p className="mb-4">
                    Each chart presents the percentage share of different energy sources.
                    Clean energy includes: biomass, nuclear, hydro, solar and wind.
                </p>
            </header>

            <div className="row g-4">
                {data.map((day, index) => (
                    <div className="col-12 col-lg-4" key={day.date}>
                        <section className="card h-100 shadow-sm">
                            <div className="card-body text-center">
                                <h2 className="h4 card-title">
                                    {dayLabels[index]}
                                </h2>

                                <p className="text-muted small mb-3">
                                    {day.date}
                                </p>

                                <p className="mb-3">
                                    Clean energy accounted for{" "}
                                    <strong className="text-success">
                                        {day.cleanEnergyPercentage.toFixed(2)}%
                                    </strong>{" "}
                                    of the energy mix.
                                </p>

                                <div className="w-100 mb-3">
                                    <EnergyMixPieChart data={day.energySourcePercentages} />
                                </div>
                            </div>
                        </section>
                    </div>
                ))}
            </div>

            <OptimalChargingWindow />
        </main>
    );
}

export default App;