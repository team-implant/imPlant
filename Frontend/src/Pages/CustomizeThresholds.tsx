import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/CustomizeThresholds.css';
import TopBar from '../components/TopBar';

interface Notification {
    message: string;
}

export default function CustomizeThresholds() {
    const [thresholds, setThresholds] = useState({
        temperature: 25,
        humidity: 60,
        soilMoisture: 40,
        lightIntensity: 300
    });

    const [notifications, setNotifications] = useState<Notification[]>([]);

    const handleSave = () => {
        // This will be a job for the backend guys , then perhaps just display a notification
        setNotifications([...notifications, { message: "Thresholds saved successfully" }]);
    };

    return (
        <div className="customize-thresholds-page">
            <TopBar notifications={notifications as any} />
            <div className="customize-thresholds-content">
                <h1>Customise Thresholds</h1>
                <div className="thresholds-form">
                    {Object.entries(thresholds).map(([key, value]) => (
                        <div key={key} className="threshold-input">
                            <label>{key}: </label>
                            <input
                                type="number"
                                value={value}
                                onChange={(e) => setThresholds({...thresholds, [key]: Number(e.target.value)})}
                            />
                        </div>
                    ))}
                    <button className="save-button" onClick={handleSave}>Save Thresholds</button>
                </div>
            </div>
        </div>
    );
}