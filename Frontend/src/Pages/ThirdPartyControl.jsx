import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ThirdPartyControl.css';
import TopBar from '../components/TopBar';

//NOTE : this page will end up being deleted

export default function ThirdPartyControl() {
    const [thirdPartyDevice, setThirdPartyDevice] = useState(false);
    const [notifications, setNotifications] = useState([]);

    const toggleThirdPartyDevice = () => {
        setThirdPartyDevice(!thirdPartyDevice);
        // Add a notification when the device state changes
        const newNotification = `Third-party device turned ${!thirdPartyDevice ? 'on' : 'off'}`;
        setNotifications([...notifications, newNotification]);
    };

    return (
        <div className="third-party-control-page">
            <TopBar notifications={notifications} />
            <div className="third-party-control-content">
                <h1>Third-Party Device Control</h1>
                <div className="device-control">
                    <h2>Device Status: {thirdPartyDevice ? 'On' : 'Off'}</h2>
                    <button onClick={toggleThirdPartyDevice}>
                        {thirdPartyDevice ? 'Turn Off' : 'Turn On'} Third-Party Device
                    </button>
                </div>
            </div>
        </div>
    );
}