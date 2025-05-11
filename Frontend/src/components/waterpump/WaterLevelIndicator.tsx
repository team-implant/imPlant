import React from 'react';
import '../../styles/WaterLevelIndicator.css'; // Adjust the path as necessary

interface WaterLevelIndicatorProps {
    level: number; // percentage from 0 to 100
}

const getColor = (level: number): string => {
    if (level < 30) return 'red';
    if (level < 60) return 'yellow';
    return 'green';
};

const WaterLevelIndicator: React.FC<WaterLevelIndicatorProps> = ({ level }) => {
    const barHeight = `${level}%`;
    const color = getColor(level);

    return (
        <div className="water-level-container">
            <div className="water-bar">
                <div
                    className="water-fill"
                    style={{ height: barHeight, backgroundColor: color }}
                />
            </div>
            <div className="level-label">{level}%</div>
        </div>
    );
};

export default WaterLevelIndicator;
