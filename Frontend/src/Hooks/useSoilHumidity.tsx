import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = 'https://sep4-implant.azurewebsites.net/api';

interface SoilHumidityData {
  id: number;
  soilHumidity: number;
  timestamp: string;
}

const getAllSoilHumidity = async (): Promise<SoilHumidityData[]> => {
  const response = await axios.get<SoilHumidityData[]>(`${BASE_URL}/soil-humidity`);
  return response.data;
};

export const useGetAllSoilHumidity = (): UseQueryResult<SoilHumidityData[], Error> => {
  return useQuery(['getAllSoilHumidity'], getAllSoilHumidity);
};

const getSoilHumidityById = async (id: number): Promise<SoilHumidityData> => {
    const response = await axios.get<SoilHumidityData>(`${BASE_URL}/soil-humidity/${id}`);
    return response.data;
};

export const useGetSoilHumidityById = (id: number): UseQueryResult<SoilHumidityData, Error> => {
    return useQuery<SoilHumidityData, Error>(
        ['getSoilHumidityById', id],
        () => getSoilHumidityById(id),
        {
            enabled: !!id,
        }
    );
};