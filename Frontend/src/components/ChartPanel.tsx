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
}

export default function ChartPanel({title, data}: Props) {
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

    return (
        <div className="chart-panel">
            <Line data={chartData} options={options}/>
        </div>
    );
}