import React from 'react';
import {Line} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions
} from 'chart.js';
import '../styles/ChartPanel.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ChartData {
    labels: string[];
    values: number[];
}

interface Props {
    title: string;
    data: ChartData;
    onClick?: () => void;
    isEnlarged?: boolean;
}

export default function ChartPanel({title, data, onClick, isEnlarged}: Props) {
    const chartData = {
        labels: data.labels,
        datasets: [
            {
                label: title,
                data: data.values,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    };

    const options: ChartOptions<'line'> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: title
            }
        }
    };

    const chartStyle = isEnlarged ? { width: '100%', height: '100%' } : {};

    return (
        <div className={`chart-panel ${isEnlarged ? 'enlarged' : ''}`} onClick={onClick} style={chartStyle}>
            <h3>{title}</h3>
            <Line data={chartData} options={options}/>
        </div>
    );
}