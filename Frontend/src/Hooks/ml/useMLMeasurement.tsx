import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import instance from "../../api/auth";
import { ML_BASE_URL } from "../../config";

interface MLMeasurementData {
  temperature: number;
  soilMoisture: number;
  lightIntensity: number;
  waterPumpLevel: number;
  timestamp: string;
}

const getMLMeasurements = async (): Promise<MLMeasurementData[]> => {
  try {
    const response = await instance.get<MLMeasurementData[]>(
      `${ML_BASE_URL}/predictions/measurements`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error instanceof AxiosError
        ? error.message
        : "Failed to fetch measurements"
    );
  }
};

export const useGetMLMeasurements = (): UseQueryResult<
  MLMeasurementData[],
  Error
> => {
  return useQuery(["mlMeasurements"], getMLMeasurements);
};
