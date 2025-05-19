import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = 'https://sep4-implant.azurewebsites.net/api';

interface AirHumidityData {
  id: number;
  airHumidity: number;
  timestamp: string;
}

const getAllAirHumidity = async (): Promise<AirHumidityData[]> => {
  const response = await axios.get<AirHumidityData[]>(`${BASE_URL}/air-humidity`);
  return response.data;
};

export const useGetAllAirHumidity = (): UseQueryResult<AirHumidityData[], Error> => {
  return useQuery(['getAllAirHumidity'], getAllAirHumidity);
};


const getAirHumidityById = async (id: number): Promise<AirHumidityData> => {
    const response = await axios.get<AirHumidityData>(`${BASE_URL}/air-humidity/${id}`);
    return response.data;
};

export const useGetAirHumidityById = (id: number): UseQueryResult<AirHumidityData, Error> => {
    return useQuery<AirHumidityData, Error>(
        ['getAirHumidityById', id],
        () => getAirHumidityById(id),
        {
            enabled: !!id,
        }
    );
};