import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { BASE_URL } from '../../config';

interface MLSoilHumidityData {
    id: number;
    soilHumidity: number;
    timestamp: string;
    anomaly: boolean;
    prediction?: number;
    recommendation?: string;
}

const getMLSoilHumidity = async (): Promise<MLSoilHumidityData[]> => {
    try {
        const response = await axios.get<MLSoilHumidityData[]>(`${BASE_URL}/soilhumidity`);
        return response.data;
    } catch (error) {
        throw new Error(error instanceof AxiosError ? error.message : 'Failed to fetch soil humidity data');
    }
};

export const useGetMLSoilHumidity = (): UseQueryResult<MLSoilHumidityData[], Error> => {
    return useQuery<MLSoilHumidityData[], Error>(['mlSoilHumidity'], getMLSoilHumidity);
};

const getMLSoilHumidityById = async (id: number): Promise<MLSoilHumidityData> => {
    const response = await axios.get<MLSoilHumidityData>(`${BASE_URL}/soil-humidity/${id}`);
    return response.data;
};

export const useGetMLSoilHumidityById = (id: number): UseQueryResult<MLSoilHumidityData, Error> => {
    return useQuery<MLSoilHumidityData, Error>(['mlSoilHumidity', id], () => getMLSoilHumidityById(id), {
        enabled: !!id,
    });
};