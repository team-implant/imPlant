import { useQuery, UseQueryResult } from "@tanstack/react-query";
import instance from "../api/auth";

interface SoilHumidityData {
  id: number;
  soilHumidity: number;
  timestamp: string;
}

const getAllSoilHumidity = async (): Promise<SoilHumidityData[]> => {
  const response = await instance.get(`${"/measurements"}`);
  const allMeasurements = response.data;

  const soilHumidityData: SoilHumidityData[] = allMeasurements.map(
    (m: any) => ({
      id: m.id,
      soilHumidity: m.soilHumidity,
      timestamp: m.timestamp,
    })
  );

  return soilHumidityData;
};

export const useGetAllSoilHumidity = (): UseQueryResult<
  SoilHumidityData[],
  Error
> => {
  return useQuery(["getAllSoilHumidity"], getAllSoilHumidity);
};

const getSoilHumidityById = async (id: number): Promise<SoilHumidityData> => {
  const response = await instance.get<SoilHumidityData>(`/soil-humidity/${id}`);
  return response.data;
};

export const useGetSoilHumidityById = (
  id: number
): UseQueryResult<SoilHumidityData, Error> => {
  return useQuery(["getSoilHumidityById", id], () => getSoilHumidityById(id), {
    enabled: !!id,
  });
};
