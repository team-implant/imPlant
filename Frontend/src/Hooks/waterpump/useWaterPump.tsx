import { useQuery, UseQueryResult } from "@tanstack/react-query";
import instance from "../../api/auth";
import { BASE_URL } from "../../config";

interface WaterPumpData {
  id: number;
  minLevel: number;
  maxLevel: number;
  timestamp: string;
}

const fetchWaterPumpById = async (id: number): Promise<WaterPumpData> => {
  const response = await instance.get<WaterPumpData>(`/water-pump/${id}`);
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
