import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { BASE_URL } from '../../config';

interface MLTemperatureData {
    id: number;
    temperature: number;
    timestamp: string;
    anomaly: boolean;
    prediction?: number;
    recommendation?: string;
}

const getMLTemperature = async (): Promise<MLTemperatureData[]> => {
    try {
        const response = await axios.get<MLTemperatureData[]>(`${BASE_URL}/temperature`);
        return response.data;
    } catch (error) {
        throw new Error(error instanceof AxiosError ? error.message : 'Failed to fetch temperature data');
    }
};

export const useGetMLTemperature = (): UseQueryResult<MLTemperatureData[], Error> => {
    return useQuery<MLTemperatureData[], Error>(['mlTemperature'], getMLTemperature);
};

const getMLTemperatureById = async (id: number): Promise<MLTemperatureData> => {
    try {
        const response = await axios.get<MLTemperatureData>(`${BASE_URL}/temperature/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error instanceof AxiosError ? error.message : 'Failed to fetch temperature data');
    }
};

export const useGetMLTemperatureById = (id: number): UseQueryResult<MLTemperatureData, Error> => {
    return useQuery<MLTemperatureData, Error>(
        ['mlTemperature', id],
        () => getMLTemperatureById(id),
        {
            enabled: !!id,
        }
    );
};