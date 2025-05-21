import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { BASE_URL } from '../../config';

interface MLWaterPumpData {
    level: number;
    timestamp: string;
    anomaly?: boolean;
    prediction?: number;
    recommendation?: string;
}

const getMLWaterPumpPredictions = async (): Promise<MLWaterPumpData[]> => {
    try {
        const response = await axios.get<MLWaterPumpData[]>(`${BASE_URL}/predictions/waterPump`);
        return response.data;
    } catch (error) {
        throw new Error(error instanceof AxiosError ? error.message : 'Failed to fetch water pump predictions');
    }
};

export const useGetMLWaterPumpPredictions = (): UseQueryResult<MLWaterPumpData[], Error> => {
    return useQuery<MLWaterPumpData[], Error>(['mlWaterPumpPredictions'], getMLWaterPumpPredictions);
};