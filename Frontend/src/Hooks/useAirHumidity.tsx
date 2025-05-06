import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = 'http://sep4-implant.azurewebsites.net/api/Measurement';

interface AirHumidityData {
    id: number;
    airHumidity: number;
    timestamp: string;
}

const getAirHumidity = async (): Promise<AirHumidityData[]> => {
    const response = await axios.get<AirHumidityData[]>(`${BASE_URL}/airhumidity`);
    return response.data;
};

export const useGetAirHumidity = (): UseQueryResult<AirHumidityData[], Error> => {
    return useQuery<AirHumidityData[], Error>(['getAirHumidity'], getAirHumidity);
};