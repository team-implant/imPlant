import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import instance from "../api/auth";

const BASE_URL = "https://sep4-implant.azurewebsites.net/api";

interface TemperatureData {
  id: number;
  temperature: number;
  timestamp: string;
}

const getAllTemperatures = async (): Promise<TemperatureData[]> => {
  const response = await instance.get<TemperatureData[]>("/temperature");
  return response.data;
};

export const useGetAllTemperatures = (): UseQueryResult<
  TemperatureData[],
  Error
> => {
  return useQuery(["getAllTemperatures"], getAllTemperatures);
};

const getTemperatureById = async (id: number): Promise<TemperatureData> => {
  const response = await instance.get<TemperatureData>(`/temperature/${id}`);
  return response.data;
};

export const useGetTemperatureById = (
  id: number
): UseQueryResult<TemperatureData, Error> => {
  return useQuery(["getTemperatureById", id], () => getTemperatureById(id), {
    enabled: !!id,
  });
};
