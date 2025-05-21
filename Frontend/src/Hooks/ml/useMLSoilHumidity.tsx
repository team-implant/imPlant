import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { BASE_URL } from '../../config';

interface MLSoilHumidityData {
    soilHumidity: number;
    timestamp: string;
    anomaly?: boolean;
    prediction?: number;
    recommendation?: string;
}

const getMLSoilHumidityPredictions = async (): Promise<MLSoilHumidityData[]> => {
    try {
        const response = await axios.get<MLSoilHumidityData[]>(`${BASE_URL}/predictions/soilhumidity`);
        return response.data;
    } catch (error) {
        throw new Error(error instanceof AxiosError ? error.message : 'Failed to fetch soil humidity predictions');
    }
};

export const useGetMLSoilHumidityPredictions = (): UseQueryResult<MLSoilHumidityData[], Error> => {
    return useQuery<MLSoilHumidityData[], Error>(['mlSoilHumidityPredictions'], getMLSoilHumidityPredictions);
};