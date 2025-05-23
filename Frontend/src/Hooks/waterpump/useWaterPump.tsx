import { useQuery, UseQueryResult } from '@tanstack/react-query'; 
import axios from 'axios'; 

const BASE_URL = 'https://sep4-implant.azurewebsites.net/api/WaterPump'; 

interface WaterPumpData { 
id: number; 
level: number; 
timestamp: string; 
} 


const fetchWaterPumpById = async (id: number): Promise<WaterPumpData> => { 
const response = await axios.get<WaterPumpData>(`${BASE_URL}/${id}`); 
return response.data; 
}; 

export const useWaterPumpData = (id: number): UseQueryResult<WaterPumpData, Error> => { 
return useQuery<WaterPumpData, Error>( 
['waterPumpData', id], 
() => fetchWaterPumpById(id), 
{ 
enabled: !!id, 
} 
); 
};

