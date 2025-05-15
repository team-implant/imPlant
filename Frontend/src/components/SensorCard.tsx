import React from 'react';
import '../styles/SensorCard.css';

interface SensorCardProps {
    label: string;
    value: string | number;
    icon: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
}

export default function SensorCard({ label, value, icon, children, className }: SensorCardProps) {
    return (
        <div className={`sensor-card ${className || ''}`}>
            <div className="icon">{icon}</div>
            <div className="info">
                <h4>{label}</h4>
                <p>{value}</p>
                {children && <div className="extra">{children}</div>}
            </div>
        </div>
    );
}
