import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_URL } from '../config';

interface AirHumidityData {
    id: number;
    airHumidity: number;
    timestamp: string;
    // Add other fields as necessary
}

interface AirHumidityChartData {
    labels: string[];
    values: number[];
}

interface AirHumidityResponse {
    apiData: AirHumidityData[];
    chartData: AirHumidityChartData;
}

const getAirHumidity = async (): Promise<AirHumidityData[]> => {
    const response = await axios.get<AirHumidityData[]>(`${BASE_URL}/air-humidity`);
    return response.data;
};

export const useGetAirHumidity = (): UseQueryResult<AirHumidityData[], Error> => {
    return useQuery<AirHumidityData[], Error>(
        ['getAirHumidity'],
        getAirHumidity
    );
};

const getAirHumidityById = async (id: number): Promise<AirHumidityData> => {
    const response = await axios.get<AirHumidityData>(`${BASE_URL}/air-humidity/${id}`);
    return response.data;
};

export const useGetAirHumidityById = (id: number): UseQueryResult<AirHumidityData, Error> => {
    return useQuery<AirHumidityData, Error>(
        ['getAirHumidityById', id],
        () => getAirHumidityById(id),
        {
            enabled: !!id,
        }
    );
};