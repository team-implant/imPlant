import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface DataPoint {
  timestamp: string;
  value: number;
}

interface TemperatureGraphProps {
  actual: DataPoint[];
  predicted: DataPoint[];
}

const TemperatureGraph: React.FC<TemperatureGraphProps> = ({
  actual,
  predicted,
}) => {
  const roundToMinute = (iso: string) =>
    new Date(iso).toISOString().slice(0, 16);

  const actualMap = new Map<string, number>();
  actual.forEach(({ timestamp, value }) => {
    const key = roundToMinute(timestamp);
    actualMap.set(key, value);
  });

  const predictedMap = new Map<string, number>();
  predicted.forEach(({ timestamp, value }) => {
    const key = roundToMinute(timestamp);
    predictedMap.set(key, value);
  });

  const allTimestamps = Array.from(
    new Set([...actualMap.keys(), ...predictedMap.keys()])
  ).sort();

  const mergedData = allTimestamps.map((timestamp) => ({
    timestamp,
    temperature: actualMap.get(timestamp) ?? null,
    prediction: predictedMap.get(timestamp) ?? null,
  }));

  return (
    <ResponsiveContainer width="100%" height={400} className="graph">
      <LineChart data={mergedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="timestamp"
          tickFormatter={(tick) => new Date(tick).toLocaleTimeString()}
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="temperature"
          stroke="#8884d8"
          name="Actual Temperature"
          dot={false}
          connectNulls
        />
        <Line
          type="monotone"
          dataKey="prediction"
          stroke="#82ca9d"
          name="Predicted Temperature"
          dot={false}
          connectNulls
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TemperatureGraph;
