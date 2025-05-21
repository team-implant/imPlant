import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface WaterPumpData {
    timestamp: string;
    level: number;
    prediction: number;
}

interface WaterPumpGraphProps {
    data: WaterPumpData[];
}

const WaterPumpGraph: React.FC<WaterPumpGraphProps> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height="100%" className="graph">
            <LineChart data={data}>
                <XAxis dataKey="timestamp" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="level" stroke="#8884d8" name="Actual Level" />
                <Line type="monotone" dataKey="prediction" stroke="#82ca9d" name="Predicted Level" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default WaterPumpGraph;