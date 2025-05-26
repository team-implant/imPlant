import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import instance from "../../api/auth";
import { ML_BASE_URL } from "../../config";

interface MLSoilHumidityData {
  Id: number;
  SoilHumidity: number;
  Timestamp: string;
}

const getMLSoilHumidityPredictions = async (): Promise<
  MLSoilHumidityData[]
> => {
  try {
    const response = await instance.get<MLSoilHumidityData[]>(
      `${ML_BASE_URL}/predictions/soilhumidity/forecast`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error instanceof AxiosError
        ? error.message
        : "Failed to fetch soil humidity predictions"
    );
  }
};

export const useGetMLSoilHumidityPredictions = (): UseQueryResult<
  MLSoilHumidityData[],
  Error
> => {
  return useQuery(["mlSoilHumidityPredictions"], getMLSoilHumidityPredictions);
};
