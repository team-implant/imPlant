import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = 'http://sep4-implant.azurewebsites.net/api/Measurement';

interface SoilHumidityData {
    id: number;
    soilHumidity: number;
    timestamp: string;
}

const getSoilHumidity = async (): Promise<SoilHumidityData[]> => {
    const response = await axios.get<SoilHumidityData[]>(`${BASE_URL}/soilhumidity`);
    return response.data;
};

export const useGetSoilHumidity = (): UseQueryResult<SoilHumidityData[], Error> => {
    return useQuery<SoilHumidityData[], Error>(['getSoilHumidity'], getSoilHumidity);
};