import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = 'https://sep4-implant.azurewebsites.net/api';

interface WaterPumpData {
    id: number;
    level: number;
    timestamp: string;
    // Add other fields as necessary
}

const getWaterPumpLevels = async (): Promise<WaterPumpData[]> => {
    const response = await axios.get<WaterPumpData[]>(`${BASE_URL}/water-pump`);
    return response.data;
};

export const useGetWaterPumpLevels = (): UseQueryResult<WaterPumpData[], Error> => {
    return useQuery<WaterPumpData[], Error>(
        ['getWaterPumpLevels'],
        getWaterPumpLevels
    );
};

const getWaterPumpLevelById = async (id: number): Promise<WaterPumpData> => {
    const response = await axios.get<WaterPumpData>(`${BASE_URL}/water-pump/${id}`);
    return response.data;
};

export const useGetWaterPumpLevelById = (id: number): UseQueryResult<WaterPumpData, Error> => {
    return useQuery<WaterPumpData, Error>(
        ['getWaterPumpLevelById', id],
        () => getWaterPumpLevelById(id),
        {
            enabled: !!id,
        }
    );
};