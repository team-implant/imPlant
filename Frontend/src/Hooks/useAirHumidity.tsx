import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = 'http://sep4-implant.azurewebsites.net/api/Measurement';

interface AirHumidityData {
    id: number;
    airHumidity: number;
    timestamp: string;
}

interface AirHumidityChartData {
    labels: string[];
    values: number[];
}

interface AirHumidityResponse {
    apiData: AirHumidityData[];
    chartData: AirHumidityChartData;
}

const getAirHumidity = async (): Promise<AirHumidityResponse> => {
    const response = await axios.get<AirHumidityData[]>(`${BASE_URL}/airhumidity`);
    const apiData = response.data;

    const chartData: AirHumidityChartData = {
        labels: apiData.map(item => new Date(item.timestamp).toLocaleTimeString()),
        values: apiData.map(item => item.airHumidity)
    };

    return { apiData, chartData };
};

export const useGetAirHumidity = (): UseQueryResult<AirHumidityResponse, Error> => {
    return useQuery<AirHumidityResponse, Error>(['getAirHumidity'], getAirHumidity);
};