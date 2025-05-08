import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = 'http://sep4-implant.azurewebsites.net/api/Measurement';

interface SoilHumidityData {
    id: number;
    soilHumidity: number;
    timestamp: string;
    plantId: number;
}

const getSoilHumidity = async (plantId: number): Promise<SoilHumidityData[]> => {
    const response = await axios.get<SoilHumidityData[]>(`${BASE_URL}/soilhumidity?plantId=${plantId}`);
    return response.data;
};

export const useGetSoilHumidity = (plantId: number): UseQueryResult<SoilHumidityData[], Error> => {
    return useQuery<SoilHumidityData[], Error>(
        ['getSoilHumidity', plantId],
        () => getSoilHumidity(plantId),
        {
            enabled: !!plantId, // Only run the query if plantId is provided
        }
    );
};