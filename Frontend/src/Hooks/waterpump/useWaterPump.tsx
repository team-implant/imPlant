import { useQuery, UseQueryResult } from "@tanstack/react-query";
import instance from "../../api/auth";

const BASE_URL = "https://sep4-implant.azurewebsites.net/api/WaterPump";

interface WaterPumpData {
  id: number;
  level: number;
  minLevel: number;
  maxLevel: number;
  timestamp: string;
}

const fetchWaterPumpById = async (id: number): Promise<WaterPumpData> => {
  const response = await instance.get<WaterPumpData>(`${BASE_URL}/${id}`);
  return response.data;
};

export const useWaterPumpData = (
  id: number
): UseQueryResult<WaterPumpData, Error> => {
  return useQuery<WaterPumpData, Error>(
    ["waterPumpData", id],
    () => fetchWaterPumpById(id),
    {
      enabled: !!id,
    }
  );
};
