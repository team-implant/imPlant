import React, { useState, useEffect } from 'react';
import '../styles/NotificationIcon.css';

export default function NotificationIcon({ notifications }) {
    const [isOpen, setIsOpen] = useState(false);
    const [hasNewNotifications, setHasNewNotifications] = useState(false);

    useEffect(() => {
        if (notifications && notifications.length > 0) {
            setHasNewNotifications(true);
        }
    }, [notifications]);

    const handleToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(!isOpen);
        setHasNewNotifications(false);
    };

    if (!notifications || notifications.length === 0) {
        return null;
    }

    return (
        <div className="notification-icon">
            <button onClick={handleToggle} className={hasNewNotifications ? 'pulse' : ''}>
                <span className="notification-count">{notifications.length}</span>
            </button>
            {isOpen && (
                <div className="modal-overlay" onClick={handleToggle}>
                    <div className={`modal-content ${isOpen ? 'modal-enter' : ''}`} onClick={(e) => e.stopPropagation()}>
                        <h2>Notifications</h2>
                        {notifications.map((notification) => (
                            <p key={notification.id}>{notification.message}</p>
                        ))}
                        <button onClick={handleToggle}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}