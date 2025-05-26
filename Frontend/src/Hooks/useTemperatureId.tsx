import { useQuery, UseQueryResult } from "@tanstack/react-query";
import instance from "../api/auth";

interface TemperatureData {
  id: number;
  temperature: number;
  timestamp: string;
  plantType: string;
}

const fetchTemperatureByPlantType = async (
  plantType: string
): Promise<TemperatureData> => {
  const response = await instance.get<TemperatureData>(`/${plantType}`);
  return response.data;
};

export const useTemperatureByPlantType = (
  plantType: string
): UseQueryResult<TemperatureData, Error> => {
  return useQuery<TemperatureData, Error>(
    ["temperatureByPlantType", plantType],
    () => fetchTemperatureByPlantType(plantType),
    {
      enabled: !!plantType,
    }
  );
};
