import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import instance from "../../api/auth";
import { ML_BASE_URL } from "../../config";

export interface MLWaterPumpData {
  Id: number;
  WaterPump: number;
  Timestamp: string;
  anomaly: boolean;
  prediction: number;
  recommendation: string;
}

const getMLWaterPumpPredictions = async (): Promise<MLWaterPumpData[]> => {
  try {
    const response = await instance.get<MLWaterPumpData[]>(
      `${ML_BASE_URL}/predictions/waterPump/forecast`
    );
    return response.data.map((item) => ({
      ...item,
      anomaly: item.anomaly ?? false,
      prediction: item.prediction ?? 0,
      recommendation: item.recommendation ?? "",
    }));
  } catch (error) {
    throw new Error(
      error instanceof AxiosError
        ? error.message
        : "Failed to fetch water pump predictions"
    );
  }
};

export const useGetMLWaterPumpPredictions = (): UseQueryResult<
  MLWaterPumpData[],
  Error
> => {
  return useQuery(["mlWaterPumpPredictions"], getMLWaterPumpPredictions);
};
