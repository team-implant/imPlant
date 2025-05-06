import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface LightIntensity {
    id: number;
    value: number;
    timestamp: string;
}

const getAllLightIntensities = async (): Promise<LightIntensity[]> => {
    const url = `http://sep4-implant.azurewebsites.net/api/LightIntensity`;
    const response = await axios.get<LightIntensity[]>(url);
    return response.data;
};

export const useGetAllLightIntensities = () => {
    const { data, isLoading, error } = useQuery<LightIntensity[], Error>(
        ['getAllLightIntensities'],
        getAllLightIntensities
    );
    return { data, loading: isLoading, error };
};

const getLightIntensityById = async (id: number): Promise<LightIntensity> => {
    const url = `http://sep4-implant.azurewebsites.net/api/LightIntensity/${id}`;
    const response = await axios.get<LightIntensity>(url);
    return response.data;
};

export const useGetLightIntensityById = (id: number) => {
    const { data, isLoading, error } = useQuery<LightIntensity, Error>(
        ['getLightIntensityById', id],
        () => getLightIntensityById(id)
    );
    return { data, loading: isLoading, error };
};