import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';

interface SoilHumidityData {
  id: number;
  soilHumidity: number;
  timestamp: string;
}

// Fetch all soil humidity data by filtering from full measurements
const getAllSoilHumidity = async (): Promise<SoilHumidityData[]> => {
  const response = await axiosInstance.get('/measurements');
  const allMeasurements = response.data;

  const soilHumidityData: SoilHumidityData[] = (response.data as SoilHumidityData[]).map(
  ({ id, soilHumidity, timestamp }) => ({
    id,
    soilHumidity,
    timestamp,
  })
);


  return soilHumidityData;
};

// React Query hook for all soil humidity
export const useGetAllSoilHumidity = (): UseQueryResult<SoilHumidityData[], Error> => {
  return useQuery(['getAllSoilHumidity'], getAllSoilHumidity);
};

// Fetch soil humidity by ID (uses a separate endpoint)
const getSoilHumidityById = async (id: number): Promise<SoilHumidityData> => {
  const response = await axiosInstance.get<SoilHumidityData>(`/soil-humidity/${id}`);
  return response.data;
};

// React Query hook for a single soil humidity value
export const useGetSoilHumidityById = (id: number): UseQueryResult<SoilHumidityData, Error> => {
  return useQuery(['getSoilHumidityById', id], () => getSoilHumidityById(id), {
    enabled: !!id,
  });
};
