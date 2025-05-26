import { useQuery, UseQueryResult } from "@tanstack/react-query";
import instance from "../api/auth";

interface LightIntensity {
  id: number;
  lightIntensity: number;
  timestamp: string;
}

const getAllLightIntensities = async (): Promise<LightIntensity[]> => {
  const response = await instance.get<LightIntensity[]>("/light-intensity");
  return response.data;
};

export const useGetAllLightIntensity = (): UseQueryResult<
  LightIntensity[],
  Error
> => {
  return useQuery(["getAllLightIntensity"], getAllLightIntensities);
};

const getLightIntensityById = async (id: number): Promise<LightIntensity> => {
  const response = await instance.get<LightIntensity>(`/light-intensity/${id}`);
  return response.data;
};

export const useGetLightIntensityById = (
  id: number
): UseQueryResult<LightIntensity, Error> => {
  return useQuery(
    ["getLightIntensityById", id],
    () => getLightIntensityById(id),
    {
      enabled: !!id,
    }
  );
};
