import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { BASE_URL } from '../../config';

interface MLMeasurementData {
    temperature: number;
    soilMoisture: number;
    lightIntensity: number;
    waterPumpLevel: number;
    timestamp: string;
}

const getMLMeasurements = async (): Promise<MLMeasurementData[]> => {
    try {
        const response = await axios.get<MLMeasurementData[]>(`${BASE_URL}/predictions/measurements`);
        return response.data;
    } catch (error) {
        throw new Error(error instanceof AxiosError ? error.message : 'Failed to fetch measurements');
    }
};

export const useGetMLMeasurements = (): UseQueryResult<MLMeasurementData[], Error> => {
    return useQuery<MLMeasurementData[], Error>(['mlMeasurements'], getMLMeasurements);
};