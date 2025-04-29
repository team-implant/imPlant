

import { useQuery } from '@tanstack/react-query';
import axios from 'axios'

const getAllTemperatures = async () => {
    const url = `http://localhost:5240/api/Measurement`;
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
