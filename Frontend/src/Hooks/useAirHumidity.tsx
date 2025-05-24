import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';

interface AirHumidityData {
  id: number;
  airHumidity: number;
  timestamp: string;
}

// Fetch all air humidity data
const getAllAirHumidity = async (): Promise<AirHumidityData[]> => {
  const response = await axiosInstance.get<AirHumidityData[]>('/air-humidity');
  return response.data;
};

export const useGetAllAirHumidity = (): UseQueryResult<AirHumidityData[], Error> => {
  return useQuery(['getAllAirHumidity'], getAllAirHumidity);
};

// Fetch air humidity by ID
const getAirHumidityById = async (id: number): Promise<AirHumidityData> => {
  const response = await axiosInstance.get<AirHumidityData>(`/air-humidity/${id}`);
  return response.data;
};

export const useGetAirHumidityById = (id: number): UseQueryResult<AirHumidityData, Error> => {
  return useQuery(['getAirHumidityById', id], () => getAirHumidityById(id), {
    enabled: !!id,
  });
};
