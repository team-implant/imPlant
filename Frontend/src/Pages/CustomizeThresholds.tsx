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

  message: string;
}

export default function CustomizeThresholds() {
  const [thresholds, setThresholds] = useState({
    temperature: { min: 20, max: 35 },
    humidity: { min: 40, max: 70 },
    soilMoisture: { min: 30, max: 70 },
    lightIntensity: { min: 200, max: 800 }
  });

  const [notifications, setNotifications] = useState<Notification[]>([]);

  const handleSave = () => {
    localStorage.setItem('thresholds', JSON.stringify(thresholds));
    setNotifications([
      ...notifications,
      { message: 'Thresholds saved successfully' }
    ]);
  };

  // 👇 Reusable handler
  const handleChange = (key: string, field: 'min' | 'max', value: number) => {
    setThresholds(prev => ({
      ...prev,
      [key]: {
        ...prev[key as keyof typeof prev],
        [field]: value
      }
    }));
  };

  return (
    <div className="customize-thresholds-page">
      <TopBar notifications={notifications as any} />
      <div className="customize-thresholds-content">
        <h1>Customise Thresholds</h1>
        <div className="thresholds-form">
          {Object.entries(thresholds).map(([key, range]) => (
            <div key={key} className="threshold-input block-label">
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
                {key} <span style={{ fontSize: '0.9rem', color: '#888' }}>(min - max)</span>
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="number"
                  value={range.min}
                  onChange={(e) => handleChange(key, 'min', Number(e.target.value))}
                  placeholder="Min"
                />
                <input
                  type="number"
                  value={range.max}
                  onChange={(e) => handleChange(key, 'max', Number(e.target.value))}
                  placeholder="Max"
                />
              </div>
            </div>


          ))}
          <button className="save-button" onClick={handleSave}>
            Save Thresholds
          </button>
        </div>
      </div>
    </div>
  );
}

