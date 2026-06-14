import { useState } from "react";
import { getOptimalChargingWindow } from "../api/neso";

type OptimalChargingWindowResponse = {
    from: string;
    to: string;
    averageCleanEnergyPercentage: number;
};

export const OptimalChargingWindow = () => {
    const [hours, setHours] = useState<number>(1);
    const [result, setResult] = useState<OptimalChargingWindowResponse | null>(null);
    const [error, setError] = useState<string>("");

    const handleSubmit = () => {
        setError("");
        setResult(null);

        if (!Number.isInteger(hours) || hours < 1 || hours > 6) {
            setError("Charging duration must be a full number of hours between 1 and 6.");
            return;
        }

        getOptimalChargingWindow(hours)
            .then(response => {
                setResult(response);
            })
            .catch(error => {
                console.error("ERROR:", error);
                setError("Could not calculate optimal charging window.");
            });
    };

    return (
        <section className="card shadow-sm mt-5">
            <div className="card-body text-center">
                <h2 className="h4 card-title mb-4">
                    Optimal EV Charging Window
                </h2>

                <p className="text-muted mb-4">
                    Enter how many hours your electric vehicle needs to charge. The application
                    will find the best charging window in the next two days, based on the highest
                    average share of clean energy in the energy mix.
                </p>

                <div className="row justify-content-center">
                    <div className="col-12 col-md-6">
                        <label htmlFor="chargingHours" className="form-label">
                            Charging duration in hours:
                        </label>

                        <input
                            id="chargingHours"
                            type="number"
                            min="1"
                            max="6"
                            step="1"
                            value={hours}
                            onChange={event => setHours(Number(event.target.value))}
                            className="form-control text-center"
                        />
                    </div>
                </div>

                <button className="btn btn-primary mt-3" onClick={handleSubmit}>
                    Find optimal window
                </button>

                {error && (
                    <p className="text-danger mt-3">
                        {error}
                    </p>
                )}

                {result && (
                    <div className="alert alert-success mt-4 mb-0">
                        <p>
                            <strong>Start:</strong> {result.from}
                        </p>

                        <p>
                            <strong>End:</strong> {result.to}
                        </p>

                        <p className="mb-0">
                            <strong>Average clean energy:</strong>{" "}
                            {result.averageCleanEnergyPercentage.toFixed(2)}%
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};