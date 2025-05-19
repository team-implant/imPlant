import React, { useState } from 'react';
import ChartPanel from '../components/ChartPanel';
import '../styles/History.css';
import TopBar from '../components/TopBar';

import { useGetAllTemperatures } from '../Hooks/useGetTemperature';
import { useGetAllLightIntensity } from '../Hooks/useGetLightIntensity';
import { useGetAllAirHumidity } from '../Hooks/useAirHumidity';
import { useGetAllSoilHumidity } from '../Hooks/useSoilHumidity';

export default function History() {
  const [notifications, setNotifications] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [hasAppliedDateFilter, setHasAppliedDateFilter] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false); 

  const { data: temperatureRawData = [], isLoading: loadingTemp } = useGetAllTemperatures();
  const { data: lightRawData = [], isLoading: loadingLight } = useGetAllLightIntensity();
  const { data: airRawData = [], isLoading: loadingAir } = useGetAllAirHumidity();
  const { data: soilRawData = [], isLoading: loadingSoil } = useGetAllSoilHumidity();

  const [temperatureChartData, setTemperatureChartData] = useState({ labels: [], values: [] });
  const [lightChartData, setLightChartData] = useState({ labels: [], values: [] });
  const [airChartData, setAirChartData] = useState({ labels: [], values: [] });
  const [soilChartData, setSoilChartData] = useState({ labels: [], values: [] });

  const today = new Date().toISOString().split('T')[0];

  const formatChartData = (rawData, valueKey, date) => {
    const filtered = rawData
      .filter(entry => {
        const ts = new Date(entry.timestamp);
        const entryDate = ts.toISOString().split('T')[0];
        return entryDate === date;
      })
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    const values = filtered.map(entry => entry[valueKey]);
    const labels = filtered.map(entry => {
      const ts = new Date(entry.timestamp);
      return ts.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
    });

    return { labels, values };
  };

  const handleApply = () => {
    if (!selectedDate) return;

    setIsFiltering(true); 
    setHasAppliedDateFilter(false); 
    setTemperatureChartData({ labels: [], values: [] });
    setLightChartData({ labels: [], values: [] });
    setAirChartData({ labels: [], values: [] });
    setSoilChartData({ labels: [], values: [] });

    setTimeout(() => {

      setTemperatureChartData(formatChartData(temperatureRawData, 'temperature', selectedDate));
      setLightChartData(formatChartData(lightRawData, 'lightIntensity', selectedDate));
      setAirChartData(formatChartData(airRawData, 'airHumidity', selectedDate));
      setSoilChartData(formatChartData(soilRawData, 'soilHumidity', selectedDate));

      setHasAppliedDateFilter(true);
      setIsFiltering(false);
    }, 100); 
  };

  const isLoading = loadingTemp || loadingLight || loadingAir || loadingSoil;

  const allDataEmpty =
    temperatureChartData.values.length === 0 &&
    lightChartData.values.length === 0 &&
    airChartData.values.length === 0 &&
    soilChartData.values.length === 0;

  return (
    <div className="page">
      <TopBar notifications={notifications} />
      <div className="history-content">
        <h1>Sensor Data History</h1>

        <div className="date-picker">
          <label>Select a Date:</label>
          <input
            type="date"
            value={selectedDate}
            max={today}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <button onClick={handleApply} disabled={!selectedDate || isLoading || isFiltering}>
            {isFiltering ? 'Loading...' : 'Apply'}
          </button>
        </div>

        {isLoading ? (
          <div className="charts loading">
            <ChartPanel title="Temperature" data={{ labels: [], values: [] }} />
            <ChartPanel title="Light Intensity" data={{ labels: [], values: [] }} />
            <ChartPanel title="Air Humidity" data={{ labels: [], values: [] }} />
            <ChartPanel title="Soil Moisture" data={{ labels: [], values: [] }} />
          </div>
        ) : (
          <>
            {hasAppliedDateFilter && allDataEmpty && (
              <p>No data available for the selected date.</p>
            )}

            <div className="charts" style={{ opacity: isFiltering ? 0.5 : 1 }}>
              <ChartPanel title="Temperature" data={temperatureChartData} />
              <ChartPanel title="Light Intensity" data={lightChartData} />
              <ChartPanel title="Air Humidity" data={airChartData} />
              <ChartPanel title="Soil Moisture" data={soilChartData} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
