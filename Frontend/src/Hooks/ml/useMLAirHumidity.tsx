import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_URL } from '../../config';

interface MLAirHumidityData {
    id: number;
    airHumidity: number;
    timestamp: string;
    // Add
}

const getMLAirHumidity = async (): Promise<MLAirHumidityData[]> => {
    const response = await axios.get<MLAirHumidityData[]>(`${BASE_URL}/airhumidity`);
    return response.data;
};

export const useGetMLAirHumidity = (): UseQueryResult<MLAirHumidityData[], Error> => {
    return useQuery<MLAirHumidityData[], Error>(['mlAirHumidity'], getMLAirHumidity);
};

const getMLAirHumidityById = async (id: number): Promise<MLAirHumidityData> => {
    const response = await axios.get<MLAirHumidityData>(`${BASE_URL}/airhumidity/${id}`);
    return response.data;
};

export const useGetMLAirHumidityById = (id: number): UseQueryResult<MLAirHumidityData, Error> => {
    return useQuery<MLAirHumidityData, Error>(['mlAirHumidity', id], () => getMLAirHumidityById(id), {
        enabled: !!id,
    });
};