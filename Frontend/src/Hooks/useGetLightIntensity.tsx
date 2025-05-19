import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios'; 
import { BASE_URL } from '../config';



interface LightIntensity {
    id: number;
    value: number;
    timestamp: string;
    // Add other fields as necessary
}

const getAllLightIntensities = async (): Promise<LightIntensity[]> => {
    const response = await axios.get<LightIntensity[]>(`${BASE_URL}/light-intensity`);
    return response.data;
};

export const useGetAllLightIntensities = (): UseQueryResult<LightIntensity[], Error> => {
    return useQuery<LightIntensity[], Error>(
        ['getAllLightIntensities'],
        getAllLightIntensities
    );
};



const BASE_URL = 'https://sep4-implant.azurewebsites.net/api';

interface LightIntensity {
  id: number;
  light: number; // IMPORTANT: match `light` if you're using that key
  timestamp: string;
}

const getAllLightIntensities = async (): Promise<LightIntensity[]> => {
  const response = await axios.get<LightIntensity[]>(`${BASE_URL}/light-intensity`);
  return response.data;
};

export const useGetAllLightIntensity = (): UseQueryResult<LightIntensity[], Error> => {
  return useQuery(['getAllLightIntensity'], getAllLightIntensities);
};


const getLightIntensityById = async (id: number): Promise<LightIntensity> => {
    const response = await axios.get<LightIntensity>(`${BASE_URL}/light-intensity/${id}`);
    return response.data;
};

export const useGetLightIntensityById = (id: number): UseQueryResult<LightIntensity, Error> => {
    return useQuery<LightIntensity, Error>(
        ['getLightIntensityById', id],
        () => getLightIntensityById(id),
        {
            enabled: !!id,
        }
    );
};