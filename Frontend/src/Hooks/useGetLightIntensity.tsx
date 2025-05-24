import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance'; // ✅ Use this instead

interface LightIntensity {
  id: number;
  lightIntensity: number;
  timestamp: string;
}

// Get all light intensity data
const getAllLightIntensities = async (): Promise<LightIntensity[]> => {
  const response = await axiosInstance.get<LightIntensity[]>('/light-intensity');
  return response.data;
};

export const useGetAllLightIntensity = (): UseQueryResult<LightIntensity[], Error> => {
  return useQuery(['getAllLightIntensity'], getAllLightIntensities);
};

// Get single by ID
const getLightIntensityById = async (id: number): Promise<LightIntensity> => {
  const response = await axiosInstance.get<LightIntensity>(`/light-intensity/${id}`);
  return response.data;
};

export const useGetLightIntensityById = (
  id: number
): UseQueryResult<LightIntensity, Error> => {
  return useQuery(['getLightIntensityById', id], () => getLightIntensityById(id), {
    enabled: !!id,
  });
};
