import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = 'http://sep4-implant.azurewebsites.net/api/Measurement';

interface AirHumidityData {
    id: number;
    airHumidity: number;
    timestamp: string;
    plantId: number;
}

interface AirHumidityChartData {
    labels: string[];
    values: number[];
}

interface AirHumidityResponse {
    apiData: AirHumidityData[];
    chartData: AirHumidityChartData;
}

const getAirHumidity = async (plantId: number): Promise<AirHumidityResponse> => {
    const response = await axios.get<AirHumidityData[]>(`${BASE_URL}/airhumidity?plantId=${plantId}`);
    const apiData = response.data;

    const chartData: AirHumidityChartData = {
        labels: apiData.map(item => new Date(item.timestamp).toLocaleTimeString()),
        values: apiData.map(item => item.airHumidity)
    };

    return { apiData, chartData };
};

export const useGetAirHumidity = (plantId: number): UseQueryResult<AirHumidityResponse, Error> => {
    return useQuery<AirHumidityResponse, Error>(
        ['getAirHumidity', plantId],
        () => getAirHumidity(plantId),
        {
            enabled: !!plantId, // Only run the query if plantId is provided
        }
    );
};