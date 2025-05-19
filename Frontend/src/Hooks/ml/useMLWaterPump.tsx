import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { BASE_URL } from '../../config';

interface MLWaterPumpData {
    id: number;
    level: number;
    timestamp: string;
    anomaly: boolean;
    prediction?: number;
    recommendation?: string;
}

const getMLWaterPumps = async (): Promise<MLWaterPumpData[]> => {
    try {
        const response = await axios.get<MLWaterPumpData[]>(`${BASE_URL}/waterpump`);
        return response.data;
    } catch (error) {
        throw new Error(error instanceof AxiosError ? error.message : 'Failed to fetch water pump data');
    }
};

export const useGetMLWaterPumps = (): UseQueryResult<MLWaterPumpData[], Error> => {
    return useQuery<MLWaterPumpData[], Error>(['mlWaterPump'], getMLWaterPumps);
};

const getMLWaterPumpById = async (id: number): Promise<MLWaterPumpData> => {
    const response = await axios.get<MLWaterPumpData>(`${BASE_URL}/waterpumps/${id}`);
    return response.data;
};

export const useGetMLWaterPumpById = (id: number): UseQueryResult<MLWaterPumpData, Error> => {
    return useQuery<MLWaterPumpData, Error>(['mlWaterPump', id], () => getMLWaterPumpById(id), {
        enabled: !!id,
    });
};