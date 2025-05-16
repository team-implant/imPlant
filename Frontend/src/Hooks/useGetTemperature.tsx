import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_URL } from '../config';



interface TemperatureData {
  id: number;
  temperature: number;
  timestamp: string;
  // Add other fields as necessary
}

const getAllTemperatures = async (): Promise<TemperatureData[]> => {
  const response = await axios.get<TemperatureData[]>(`${BASE_URL}/temperature`);
  return response.data;
};

export const useGetAllTemperatures = (): UseQueryResult<TemperatureData[], Error> => {
  return useQuery(['getAllTemperatures'], getAllTemperatures);
};

const getTemperatureById = async (id: number): Promise<TemperatureData> => {
  const response = await axios.get<TemperatureData>(`${BASE_URL}/temperature/${id}`);
  return response.data;
};

export const useGetTemperatureById = (id: number): UseQueryResult<TemperatureData, Error> => {
  return useQuery(['getTemperatureById', id], () => getTemperatureById(id), {
    enabled: !!id,
  });
};
