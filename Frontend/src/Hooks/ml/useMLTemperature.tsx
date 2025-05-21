import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { BASE_URL } from '../../config';

interface MLTemperatureData {
    temperature: number;
    timestamp: string;
    anomaly?: boolean;
    prediction?: number;
    recommendation?: string;
}

const getMLTemperaturePredictions = async (): Promise<MLTemperatureData[]> => {
    try {
        const response = await axios.get<MLTemperatureData[]>(`${BASE_URL}/predictions/temperature`);
        return response.data;
    } catch (error) {
        throw new Error(error instanceof AxiosError ? error.message : 'Failed to fetch temperature predictions');
    }
};

export const useGetMLTemperaturePredictions = (): UseQueryResult<MLTemperatureData[], Error> => {
    return useQuery<MLTemperatureData[], Error>(['mlTemperaturePredictions'], getMLTemperaturePredictions);
};