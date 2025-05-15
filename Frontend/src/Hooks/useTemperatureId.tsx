import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = 'http://sep4-implant.azurewebsites.net/api/Temperature';

interface TemperatureData {
    id: number;
    temperature: number;
    timestamp: string;
    plantType: string;
    // check later if this fits with the backend
}

const fetchTemperatureByPlantType = async (plantType: string): Promise<TemperatureData> => {
    const response = await axios.get<TemperatureData>(`${BASE_URL}/${plantType}`);
    return response.data;
};

export const useTemperatureByPlantType = (plantType: string): UseQueryResult<TemperatureData, Error> => {
    return useQuery<TemperatureData, Error>(
        ['temperatureByPlantType', plantType],
        () => fetchTemperatureByPlantType(plantType),
        {
            enabled: !!plantType,
        }
    );
};