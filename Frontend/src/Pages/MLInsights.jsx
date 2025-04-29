import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/MLInsights.css';
import TopBar from '../components/TopBar';

export default function MLInsights() {
    const [notifications, setNotifications] = useState([]);

    return (
        <div className="ml-insights-page">
            <TopBar notifications={notifications} />
            <div className="ml-insights-content">
                <h1>ML Insights</h1>

                <div className="insights-container">
                    <div className="insight-card">
                        <h2>🌱 Plant Growth Prediction</h2>
                        <p>Based on current conditions, your plants are expected to grow 2.5cm next week innit.</p>
                    </div>

                    <div className="insight-card">
                        <h2>💧 Watering Schedule Optimisation</h2>
                        <p>Recommended next watering: Tomorrow at 9:00 AM</p>
                        <p>Estimated water savings: 15% compared to fixed schedule</p>
                    </div>

                    <div className="insight-card">
                        <h2>🌡️ Measurement Trend </h2>
                        <p>Predicted temperature range for next 24 hours: 20°C - 25°C</p>
                        <p>No significant anomalies expected.</p>
                    </div>

                    <div className="insight-card">
                        <h2>☀️ Light Exposure </h2>
                        <p>Your plants received optimal light exposure today. Consider rotating pots for even growth.</p>
                    </div>

                    <div className="insight-card">
                        <h2>💦 Humidity Trend </h2>
                        <p>Predicted humidity range for next 24 hours: 55% - 65%</p>
                        <p>Recommendation: No action needed, levels are optimal.</p>
                    </div>

                    <div className="insight-card">
                        <h2>🚰 Water Pump Level Prediction</h2>
                        <p>Current level: 70%</p>
                        <p>Estimated days until refill needed: 5 days</p>
                    </div>
                </div>
            </div>
        </div>
    );
}