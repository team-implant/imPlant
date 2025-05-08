
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';

interface TemperatureData {
  id: number;
  plantId: number;
  temperature: number;
  timestamp: string;
}

const getAllTemperatures = async (plantId: number): Promise<TemperatureData[]> => {
  const url = `http://sep4-implant.azurewebsites.net/api/Measurement${plantId}`;
  const response = await axios.get<TemperatureData[]>(url);
  return response.data;
};

export const useGetAllTemperatures = (plantId: number): UseQueryResult<TemperatureData[], Error> => {
  return useQuery(
    ['getAllTemperatures', plantId],
    () => getAllTemperatures(plantId),
    {
      enabled: !!plantId, // Only run the query if plantId is provided
    }
  );
};
