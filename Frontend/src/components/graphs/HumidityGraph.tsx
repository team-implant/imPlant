import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface HumidityData {
    timestamp: string;
    humidity: number;
    prediction: number;
}

interface HumidityGraphProps {
    data: HumidityData[];
}

const HumidityGraph: React.FC<HumidityGraphProps> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height="100%" className="graph">
            <LineChart data={data}>
                <XAxis dataKey="timestamp" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="humidity" stroke="#8884d8" name="Actual Humidity" />
                <Line type="monotone" dataKey="prediction" stroke="#82ca9d" name="Predicted Humidity" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default HumidityGraph;