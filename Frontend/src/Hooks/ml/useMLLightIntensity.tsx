import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { BASE_URL } from '../../config';

interface MLLightIntensityData {
    lightIntensity: number;
    timestamp: string;
    anomaly?: boolean;
    prediction?: number;
    recommendation?: string;
}

const getMLLightIntensityPredictions = async (): Promise<MLLightIntensityData[]> => {
    try {
        const response = await axios.get<MLLightIntensityData[]>(`${BASE_URL}/predictions/lightintensity`);
        return response.data;
    } catch (error) {
        throw new Error(error instanceof AxiosError ? error.message : 'Failed to fetch light intensity predictions');
    }
};

export const useGetMLLightIntensityPredictions = (): UseQueryResult<MLLightIntensityData[], Error> => {
    return useQuery<MLLightIntensityData[], Error>(['mlLightIntensityPredictions'], getMLLightIntensityPredictions);
};