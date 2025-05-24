import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance'; // ✅ Use shared instance

interface TemperatureData {
  id: number;
  temperature: number;
  timestamp: string;
}

// Fetch all temperature data
const getAllTemperatures = async (): Promise<TemperatureData[]> => {
  const response = await axiosInstance.get<TemperatureData[]>('/temperature');
  return response.data;
};

export const useGetAllTemperatures = (): UseQueryResult<TemperatureData[], Error> => {
  return useQuery(['getAllTemperatures'], getAllTemperatures);
};

// Fetch temperature by ID
const getTemperatureById = async (id: number): Promise<TemperatureData> => {
  const response = await axiosInstance.get<TemperatureData>(`/temperature/${id}`);
  return response.data;
};

export const useGetTemperatureById = (
  id: number
): UseQueryResult<TemperatureData, Error> => {
  return useQuery(['getTemperatureById', id], () => getTemperatureById(id), {
    enabled: !!id,
  });
};
