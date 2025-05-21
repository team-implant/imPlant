import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface LightExposureData {
    timestamp: string;
    lightIntensity: number;
    prediction: number;
}

interface LightExposureGraphProps {
    data: LightExposureData[];
}

const LightExposureGraph: React.FC<LightExposureGraphProps> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height="100%" className="graph">
            <LineChart data={data}>
                <XAxis dataKey="timestamp" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="lightIntensity" stroke="#8884d8" name="Actual Light Intensity" />
                <Line type="monotone" dataKey="prediction" stroke="#82ca9d" name="Predicted Light Intensity" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default LightExposureGraph;