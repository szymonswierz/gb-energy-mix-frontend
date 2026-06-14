import {
    PieChart,
    Pie,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Sector
} from "recharts";

type EnergySourcePercentage = {
    fuel: string;
    percentage: number;
};

type ChartData = {
    fuel: string;
    percentage: number;
    fill: string;
};

type Props = {
    data: EnergySourcePercentage[];
};

const COLORS = [
    "#4ade80",
    "#1f2937",
    "#e35242",
    "#4242e3",
    "#a855f7",
    "#df8c27",
    "#60c2c2",
    "#ddc109",
    "#a1b4b6"
];

const renderPieSector = (props: any) => {
    return (
        <Sector
            {...props}
            fill={props.payload.fill}
        />
    );
};

export const EnergyMixPieChart = ({ data }: Props) => {
    const chartData: ChartData[] = data.map((item, index) => ({
        fuel: item.fuel,
        percentage: Number(item.percentage.toFixed(2)),
        fill: COLORS[index % COLORS.length]
    }));

    return (
        <div style={{ width: "100%", height: "360px" }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="percentage"
                        nameKey="fuel"
                        outerRadius={80}
                        shape={renderPieSector}
                    />

                    <Tooltip />

                    <Legend
                        verticalAlign="bottom"
                        wrapperStyle={{
                            fontSize: "14px",
                            paddingTop: "12px"
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};