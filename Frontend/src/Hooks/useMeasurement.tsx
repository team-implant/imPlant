import { useQuery } from "@tanstack/react-query";
import instance from "../api/auth";

export interface MeasurementData {
  id: number;
  temperature: number;
  airHumidity: number;
  soilHumidity: number;
  lightIntensity: number;
  tankFillLevel: number;
  timestamp: string;
  plantId: number | null;
  plant: {
    id: number;
    name: string;
  } | null;
}

export const useMeasurements = () => {
  return useQuery<MeasurementData[], Error>({
    queryKey: ["measurements"],
    queryFn: async () => {
      const { data } = await instance.get<MeasurementData[]>("/measurements");
      return data;
    },
  });
};

export const useMeasurementsByPlant = (plantId: number) => {
  return useQuery<MeasurementData[], Error>({
    queryKey: ["measurements", plantId],
    queryFn: async () => {
      const { data } = await instance.get<MeasurementData[]>(
        `/measurements/by-plant/${plantId}`
      );
      return data;
    },
    enabled: !!plantId,
  });
};

export const useMeasurementById = (id: number) => {
  return useQuery<MeasurementData, Error>({
    queryKey: ["measurement", id],
    queryFn: async () => {
      const { data } = await instance.get<MeasurementData>(
        `/measurements/${id}`
      );
      return data;
    },
    enabled: !!id,
  });
};
