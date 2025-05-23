import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface WateringScheduleData {
    timestamp: string;
    wateringAmount: number;
    prediction: number;
}

interface WateringScheduleGraphProps {
    data: WateringScheduleData[];
}

const WateringScheduleGraph: React.FC<WateringScheduleGraphProps> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height="100%" className="graph">
            <LineChart data={data}>
                <XAxis dataKey="timestamp" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="wateringAmount" stroke="#8884d8" name="Actual Watering Amount" />
                <Line type="monotone" dataKey="prediction" stroke="#82ca9d" name="Predicted Watering Amount" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default WateringScheduleGraph;