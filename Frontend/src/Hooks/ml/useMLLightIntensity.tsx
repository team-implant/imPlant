import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import instance from "../../api/auth";
import { ML_BASE_URL } from "../../config";

interface MLLightIntensityData {
  Id: number;
  LightIntensity: number;
  Timestamp: string;
}

const getMLLightIntensityPredictions = async (): Promise<
  MLLightIntensityData[]
> => {
  try {
    const response = await instance.get<MLLightIntensityData[]>(
      `${ML_BASE_URL}/predictions/lightintensity/forecast`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error instanceof AxiosError
        ? error.message
        : "Failed to fetch light intensity predictions"
    );
  }
};

export const useGetMLLightIntensityPredictions = (): UseQueryResult<
  MLLightIntensityData[],
  Error
> => {
  return useQuery(
    ["mlLightIntensityPredictions"],
    getMLLightIntensityPredictions
  );
};
