import React from 'react';
import '../styles/SensorCard.css'

interface SensorCardProps {
    label: string;
    value: string | number;
    icon: React.ReactNode;
}
export default function SensorCard({ label, value, icon }:SensorCardProps) {
    return (
        <div className="sensor-card">
            <div className="icon">{icon}</div>
            <div className="info">
                <h4>{label}</h4>
                <p>{value}</p>
            </div>
        </div>
    );
}
