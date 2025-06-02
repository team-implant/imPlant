import { useQuery, UseQueryResult } from "@tanstack/react-query";
import instance from "../api/auth";

interface AirHumidityData {
  id: number;
  airHumidity: number;
  timestamp: string;
}

const getAllAirHumidity = async (): Promise<AirHumidityData[]> => {
  const response = await instance.get<AirHumidityData[]>("/air-humidity");
  console.log("Dupa cyce" + response.data);
  return response.data;
};

export const useGetAllAirHumidity = (): UseQueryResult<
  AirHumidityData[],
  Error
> => {
  return useQuery(["getAllAirHumidity"], getAllAirHumidity);
};

const getAirHumidityById = async (id: number): Promise<AirHumidityData> => {
  const response = await instance.get<AirHumidityData>(`/air-humidity/${id}`);
  return response.data;
};

export const useGetAirHumidityById = (
  id: number
): UseQueryResult<AirHumidityData, Error> => {
  return useQuery(["getAirHumidityById", id], () => getAirHumidityById(id), {
    enabled: !!id,
  });
};
