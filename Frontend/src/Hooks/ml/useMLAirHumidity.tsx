import { useQuery, UseQueryResult } from "@tanstack/react-query";
import instance from "../../api/auth";
import { ML_BASE_URL } from "../../config";

interface MLAirHumidityData {
  Id: number;
  AirHumidity: number;
  Timestamp: string;
}

const getMLAirHumidity = async (): Promise<MLAirHumidityData[]> => {
  const response = await instance.get<MLAirHumidityData[]>(
    `${ML_BASE_URL}/predictions/airhumidity/forecast`
  );
  return response.data;
};

export const useGetMLAirHumidity = (): UseQueryResult<
  MLAirHumidityData[],
  Error
> => {
  return useQuery(["mlAirHumidity"], getMLAirHumidity);
};

const getMLAirHumidityById = async (id: number): Promise<MLAirHumidityData> => {
  const response = await instance.get<MLAirHumidityData>(
    `${ML_BASE_URL}/airhumidity/${id}`
  );
  return response.data;
};

export const useGetMLAirHumidityById = (
  id: number
): UseQueryResult<MLAirHumidityData, Error> => {
  return useQuery(["mlAirHumidity", id], () => getMLAirHumidityById(id), {
    enabled: !!id,
  });
};
