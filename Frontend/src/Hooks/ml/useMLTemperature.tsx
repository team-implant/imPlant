import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import instance from "../../api/auth";
import { ML_BASE_URL } from "../../config";

interface MLTemperatureData {
  Id: number;
  Temperature: number;
  Timestamp: string;
}

const getMLTemperaturePredictions = async (): Promise<MLTemperatureData[]> => {
  try {
    const response = await instance.get<MLTemperatureData[]>(
      `${ML_BASE_URL}/predictions/temperatures/forecast`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error instanceof AxiosError
        ? error.message
        : "Failed to fetch temperature predictions"
    );
  }
};

export const useGetMLTemperaturePredictions = (): UseQueryResult<
  MLTemperatureData[],
  Error
> => {
  return useQuery(["mlTemperaturePredictions"], getMLTemperaturePredictions);
};
