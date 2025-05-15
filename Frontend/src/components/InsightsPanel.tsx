import React from 'react';
import '../styles/InsightsPanel.css';

export default function InsightsPanel() {
    return (
        <div className="insights-panel">
            <h3> Real-time Insights</h3>
            <ul>
                <li>🌡️ Measurement placeholder.</li>
                <li>💧 Soil moisture placeholder.</li>
                <li>☀️ Light intensity placeholder.</li>
                <li>🚰 Water pump level placeholder.</li>
            </ul>
        </div>
    );
}