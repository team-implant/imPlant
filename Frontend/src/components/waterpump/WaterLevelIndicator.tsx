import React from 'react'; 
import '../../styles/WaterLevelIndicator.css'; 

interface WaterLevelIndicatorProps { 
level: number; 
} 

const getColor = (level: number): string => { 
if (level < 30) return 'red'; 
if (level < 60) return 'yellow'; 
return 'green'; 
}; 

const WaterLevelIndicator: React.FC<WaterLevelIndicatorProps> = ({ level }) => { 
const barWidth = `${level}%`; 
const color = getColor(level); 

return ( 
<div className="water-level-container"> 
<div className="water-bar-horizontal"> 
<div 
className="water-fill-horizontal" 
style={{ width: barWidth, backgroundColor: color }} 
/> 
</div> 
<div className="level-label">{level}%</div> 
</div> 
); 
}; 

export default WaterLevelIndicator;
