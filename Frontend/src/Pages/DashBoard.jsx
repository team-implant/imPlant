import React, { useState, useEffect } from 'react';
import SensorCard from '../components/SensorCard';
import ChartPanel from '../components/ChartPanel';
import InsightsPanel from '../components/InsightsPanel';
import TopBar from '../components/TopBar';
import '../styles/dashboard.css';
import { useGetAllTemperatures } from "../Hooks/useGetTemperature.jsx";

export default function Dashboard() {
  const [plantType] = useState('Bell Pepper');
  const [notifications, setNotifications] = useState([]);
  const { data, loading, error } = useGetAllTemperatures();

  useEffect(() => {
    // Load real notifications if you have an endpoint; for now we just leave it empty.
    setNotifications([
      { id: 1, message: "System online and monitoring." }
    ]);
  }, []);

  const handleIrrigationControl = async (activate) => {
    try {
      // Replace with your real irrigation control API call
      console.log(`Irrigation ${activate ? 'activated' : 'deactivated'}`);
    } catch (err) {
      console.error("Irrigation control error:", err);
    }
  };

  return (
    <div className="dashboard-container">
      <TopBar notifications={notifications} />

      <header className="dashboard-header">
        <h1>{plantType} Dashboard</h1>
        <p>Greenhouse Monitoring Dashboard</p>

        {loading ? (
          <p>Loading temperature data...</p>
        ) : error ? (
          <p className="error">Error loading data: {error.message}</p>
        ) : data?.length ? (
          <ul>
            {data.map((measurement) => (
              <li key={measurement.id}>
                🌡️ <strong>Temp:</strong> {measurement.temperature}°C | 💧 <strong>Humidity:</strong> {measurement.humidity}% | ⏱️ <strong>Time:</strong> {new Date(measurement.timestamp).toLocaleString()}
              </li>
            ))}
          </ul>
        ) : (
          <p>No measurements available.</p>
        )}
      </header>

      <main className="dashboard-main">
        {/* Replace these with live summaries if available */}
        {data && data.length > 0 && (
          <>
            <SensorCard type="Temperature" value={data.at(-1).temperature} />
            <SensorCard type="Humidity" value={data.at(-1).humidity} />
            {/* Add other sensor cards if data supports them */}
          </>
        )}

        <ChartPanel data={data} />
        <InsightsPanel />
      </main>
    </div>
  );
}
