

import { useQuery } from '@tanstack/react-query';
import axios from 'axios'

const getAllTemperatures = async () => {
    const url = `http://sep4-implant.azurewebsites.net/api/Measurement`;
    const response = await axios.get(url);
    return response.data;
};

export const useGetAllTemperatures = () => {
    const { data, isLoading, error } = useQuery(
        ['getAllTemperatures'],
        getAllTemperatures,
    );
    return { data, loading: isLoading, error };
};
