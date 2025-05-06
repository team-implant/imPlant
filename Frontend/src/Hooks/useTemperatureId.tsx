import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = 'http://sep4-implant.azurewebsites.net/api/Temperature';

interface TemperatureData {
    id: number;
    temperature: number;
    timestamp: string;
    // check
}

const fetchTemperatureById = async (id: number): Promise<TemperatureData> => {
    const response = await axios.get<TemperatureData>(`${BASE_URL}/${id}`);
    return response.data;
};

export const useTemperatureId = (id: number): UseQueryResult<TemperatureData, Error> => {
    return useQuery<TemperatureData, Error>(
        ['temperatureId', id],
        () => fetchTemperatureById(id),
        {
            enabled: !!id,
        }
    );
};