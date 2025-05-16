import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_URL } from '../config';



interface SoilHumidityData {
    id: number;
    soilHumidity: number;
    timestamp: string;
    // Add other fields as necessary
}

const getSoilHumidity = async (): Promise<SoilHumidityData[]> => {
    const response = await axios.get<SoilHumidityData[]>(`${BASE_URL}/soil-humidity`);
    return response.data;
};

export const useGetSoilHumidity = (): UseQueryResult<SoilHumidityData[], Error> => {
    return useQuery<SoilHumidityData[], Error>(
        ['getSoilHumidity'],
        getSoilHumidity
    );
};

const getSoilHumidityById = async (id: number): Promise<SoilHumidityData> => {
    const response = await axios.get<SoilHumidityData>(`${BASE_URL}/soil-humidity/${id}`);
    return response.data;
};

export const useGetSoilHumidityById = (id: number): UseQueryResult<SoilHumidityData, Error> => {
    return useQuery<SoilHumidityData, Error>(
        ['getSoilHumidityById', id],
        () => getSoilHumidityById(id),
        {
            enabled: !!id,
        }
    );
};