import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PlantGrowthData {
    timestamp: string;
    growth: number;
    prediction: number;
}

interface PlantGrowthGraphProps {
    data: PlantGrowthData[];
}

const PlantGrowthGraph: React.FC<PlantGrowthGraphProps> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height="100%" className="graph">
            <LineChart data={data}>
                <XAxis dataKey="timestamp" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="growth" stroke="#8884d8" name="Actual Growth" />
                <Line type="monotone" dataKey="prediction" stroke="#82ca9d" name="Predicted Growth" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default PlantGrowthGraph;