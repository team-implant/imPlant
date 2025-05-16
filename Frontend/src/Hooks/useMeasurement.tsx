import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_URL } from '../config';



export interface MeasurementData {
    id: number;
    temperature?: number;
    humidity?: number;
    soilMoisture?: number;
    lightIntensity?: number;
    timestamp: string;
    plantType: string;
}

const fetchMeasurementsByPlantType = async (plantType: string): Promise<MeasurementData[]> => {
    const response = await axios.get<MeasurementData[]>(`${BASE_URL}/${plantType}`);
    return response.data;
};

export const useMeasurementsByPlantType = (plantType: string): UseQueryResult<MeasurementData[], Error> => {
    return useQuery<MeasurementData[], Error>(
        ['measurementsByPlantType', plantType],
        () => fetchMeasurementsByPlantType(plantType),
        {
            enabled: !!plantType,
        }
    );
};

export const useTemperatureByPlantType = (plantType: string): UseQueryResult<number[] | undefined, Error> => {
    const query = useMeasurementsByPlantType(plantType);
    return {
        ...query,
        data: query.data?.map(measurement => measurement.temperature).filter((temp): temp is number => temp !== undefined),
    } as UseQueryResult<number[] | undefined, Error>;
};

export const useHumidityByPlantType = (plantType: string): UseQueryResult<number[] | undefined, Error> => {
    const query = useMeasurementsByPlantType(plantType);
    return {
        ...query,
        data: query.data?.map(measurement => measurement.humidity).filter((humidity): humidity is number => humidity !== undefined),
    } as UseQueryResult<number[] | undefined, Error>;
};

export const useSoilMoistureByPlantType = (plantType: string): UseQueryResult<number[] | undefined, Error> => {
    const query = useMeasurementsByPlantType(plantType);
    return {
        ...query,
        data: query.data?.map(measurement => measurement.soilMoisture).filter((moisture): moisture is number => moisture !== undefined),
    } as UseQueryResult<number[] | undefined, Error>;
};

export const useLightIntensityByPlantType = (plantType: string): UseQueryResult<number[] | undefined, Error> => {
    const query = useMeasurementsByPlantType(plantType);
    return {
        ...query,
        data: query.data?.map(measurement => measurement.lightIntensity).filter((intensity): intensity is number => intensity !== undefined),
    } as UseQueryResult<number[] | undefined, Error>;
};