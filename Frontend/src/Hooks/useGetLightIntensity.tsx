import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = 'http://sep4-implant.azurewebsites.net/api/Measurement';

interface LightIntensity {
    id: number;
    value: number;
    timestamp: string;
    plantId: number;
}

const getAllLightIntensities = async (plantId: number): Promise<LightIntensity[]> => {
    const url = `${BASE_URL}/lightintensity?plantId=${plantId}`;
    const response = await axios.get<LightIntensity[]>(url);
    return response.data;
};

export const useGetAllLightIntensities = (plantId: number): UseQueryResult<LightIntensity[], Error> => {
    return useQuery<LightIntensity[], Error>(
        ['getAllLightIntensities', plantId],
        () => getAllLightIntensities(plantId),
        {
            enabled: !!plantId,
        }
    );
};

const getLightIntensityById = async (id: number, plantId: number): Promise<LightIntensity> => {
    const url = `${BASE_URL}/lightintensity/${id}?plantId=${plantId}`;
    const response = await axios.get<LightIntensity>(url);
    return response.data;
};

export const useGetLightIntensityById = (id: number, plantId: number): UseQueryResult<LightIntensity, Error> => {
    return useQuery<LightIntensity, Error>(
        ['getLightIntensityById', id, plantId],
        () => getLightIntensityById(id, plantId),
        {
            enabled: !!id && !!plantId, // Only run the query if both id and plantId are there ?
        }
    );
};