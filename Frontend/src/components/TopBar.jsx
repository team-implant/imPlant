import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NotificationIcon from './NotificationIcon';
import '../styles/TopBar.css';

export default function TopBar({ notifications }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const isDashboard = location.pathname === '/';

    return (
        <div className={`top-bar ${isDashboard ? 'dashboard' : ''}`}>
            <div className="dropdown">
                <button className="dropdown-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    Menu ▼
                </button>
                {isMenuOpen && (
                    <div className="dropdown-menu">
                        <Link to="/" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                        <Link to="/history" onClick={() => setIsMenuOpen(false)}>History</Link>
                        <Link to="/ml-insights" onClick={() => setIsMenuOpen(false)}>Insights</Link>
                        <Link to="/customize-thresholds" onClick={() => setIsMenuOpen(false)}>Customise Thresholds</Link>
                        <Link to="/third-party-control" onClick={() => setIsMenuOpen(false)}>Third-Party Control</Link>
                    </div>
                )}
            </div>

            <div className="notification-area">
                <NotificationIcon notifications={notifications} />
            </div>
        </div>
    );
}