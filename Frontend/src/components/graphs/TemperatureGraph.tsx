import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TemperatureData {
    timestamp: string;
    temperature: number;
    prediction: number;
}

interface TemperatureGraphProps {
    data: TemperatureData[];
}

const TemperatureGraph: React.FC<TemperatureGraphProps> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height="100%" className="graph">
            <LineChart data={data}>
                <XAxis dataKey="timestamp" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="temperature" stroke="#8884d8" name="Actual Temperature" />
                <Line type="monotone" dataKey="prediction" stroke="#82ca9d" name="Predicted Temperature" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default TemperatureGraph;