import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { BASE_URL } from '../../config';

interface MLLightIntensityData {
    id: number;
    lightIntensity: number;
    timestamp: string;
    anomaly: boolean;
    prediction?: number;
    recommendation?: string;
}

const getMLLightIntensity = async (): Promise<MLLightIntensityData[]> => {
    try {
        const response = await axios.get<MLLightIntensityData[]>(`${BASE_URL}/lightintensity`);
        return response.data;
    } catch (error) {
        throw new Error(error instanceof AxiosError ? error.message : 'Failed to fetch light intensity data');
    }
};

export const useGetMLLightIntensity = (): UseQueryResult<MLLightIntensityData[], Error> => {
    return useQuery<MLLightIntensityData[], Error>(['mlLightIntensity'], getMLLightIntensity);
};

const getMLLightIntensityById = async (id: number): Promise<MLLightIntensityData> => {
    try {
        const response = await axios.get<MLLightIntensityData>(`${BASE_URL}/lightintensity/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error instanceof AxiosError ? error.message : 'Failed to fetch light intensity data');
    }
};

export const useGetMLLightIntensityById = (id: number): UseQueryResult<MLLightIntensityData, Error> => {
    return useQuery<MLLightIntensityData, Error>(
        ['mlLightIntensity', id],
        () => getMLLightIntensityById(id),
        {
            enabled: !!id,
        }
    );
};