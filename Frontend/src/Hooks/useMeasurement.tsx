import {
    FetchStatus,
    QueryObserverResult, RefetchOptions, RefetchQueryFilters,
    useQuery,
    UseQueryResult
} from '@tanstack/react-query';
import axios from 'axios';
import { BASE_URL } from '../config';

export interface MeasurementData {
    id: number;
    temperature: number;
    airHumidity: number;
    soilHumidity: number;
    lightIntensity: number;
    tankFillLevel: number;
    timestamp: string;
    plantId: number | null;
    plant: string | null;
}

const fetchMeasurements = async (): Promise<MeasurementData[]> => {
    const response = await axios.get<MeasurementData[]>(`${BASE_URL}/measurements`);
    return response.data;
};

export const useMeasurements = (): UseQueryResult<MeasurementData[], Error> => {
    return useQuery<MeasurementData[], Error>(
        ['measurements'],
        fetchMeasurements
    );
};

export const useTemperatures = (): {
    data: number[] | undefined;
    error: Error | null;
    isError: true | false;
    isLoading: false | true;
    isLoadingError: false | true;
    isRefetchError: true | false;
    isSuccess: false | true;
    status: "error" | "success" | "loading";
    dataUpdatedAt: number;
    errorUpdatedAt: number;
    failureCount: number;
    failureReason: Error | null;
    errorUpdateCount: number;
    isFetched: boolean;
    isFetchedAfterMount: boolean;
    isFetching: boolean;
    isInitialLoading: boolean;
    isPaused: boolean;
    isPlaceholderData: boolean;
    isPreviousData: boolean;
    isRefetching: boolean;
    isStale: boolean;
    refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>)) => Promise<QueryObserverResult<MeasurementData[], Error>>;
    remove: () => void;
    fetchStatus: FetchStatus
} => {
    const query = useMeasurements();
    return {
        ...query,
        data: query.data?.map(measurement => measurement.temperature),
    };
};

export const useAirHumidity = (): {
    data: number[] | undefined;
    error: Error | null;
    isError: true | false;
    isLoading: false | true;
    isLoadingError: false | true;
    isRefetchError: true | false;
    isSuccess: false | true;
    status: "error" | "success" | "loading";
    dataUpdatedAt: number;
    errorUpdatedAt: number;
    failureCount: number;
    failureReason: Error | null;
    errorUpdateCount: number;
    isFetched: boolean;
    isFetchedAfterMount: boolean;
    isFetching: boolean;
    isInitialLoading: boolean;
    isPaused: boolean;
    isPlaceholderData: boolean;
    isPreviousData: boolean;
    isRefetching: boolean;
    isStale: boolean;
    refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>)) => Promise<QueryObserverResult<MeasurementData[], Error>>;
    remove: () => void;
    fetchStatus: FetchStatus
} => {
    const query = useMeasurements();
    return {
        ...query,
        data: query.data?.map(measurement => measurement.airHumidity),
    };
};

export const useSoilHumidity = (): {
    data: number[] | undefined;
    error: Error | null;
    isError: true | false;
    isLoading: false | true;
    isLoadingError: false | true;
    isRefetchError: true | false;
    isSuccess: false | true;
    status: "error" | "success" | "loading";
    dataUpdatedAt: number;
    errorUpdatedAt: number;
    failureCount: number;
    failureReason: Error | null;
    errorUpdateCount: number;
    isFetched: boolean;
    isFetchedAfterMount: boolean;
    isFetching: boolean;
    isInitialLoading: boolean;
    isPaused: boolean;
    isPlaceholderData: boolean;
    isPreviousData: boolean;
    isRefetching: boolean;
    isStale: boolean;
    refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>)) => Promise<QueryObserverResult<MeasurementData[], Error>>;
    remove: () => void;
    fetchStatus: FetchStatus
} => {
    const query = useMeasurements();
    return {
        ...query,
        data: query.data?.map(measurement => measurement.soilHumidity),
    };
};

export const useLightIntensity = (): {
    data: number[] | undefined;
    error: Error | null;
    isError: true | false;
    isLoading: false | true;
    isLoadingError: false | true;
    isRefetchError: true | false;
    isSuccess: false | true;
    status: "error" | "success" | "loading";
    dataUpdatedAt: number;
    errorUpdatedAt: number;
    failureCount: number;
    failureReason: Error | null;
    errorUpdateCount: number;
    isFetched: boolean;
    isFetchedAfterMount: boolean;
    isFetching: boolean;
    isInitialLoading: boolean;
    isPaused: boolean;
    isPlaceholderData: boolean;
    isPreviousData: boolean;
    isRefetching: boolean;
    isStale: boolean;
    refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>)) => Promise<QueryObserverResult<MeasurementData[], Error>>;
    remove: () => void;
    fetchStatus: FetchStatus
} => {
    const query = useMeasurements();
    return {
        ...query,
        data: query.data?.map(measurement => measurement.lightIntensity),
    };
};

export const useTankFillLevel = (): {
    data: number[] | undefined;
    error: Error | null;
    isError: true | false;
    isLoading: false | true;
    isLoadingError: false | true;
    isRefetchError: true | false;
    isSuccess: false | true;
    status: "error" | "success" | "loading";
    dataUpdatedAt: number;
    errorUpdatedAt: number;
    failureCount: number;
    failureReason: Error | null;
    errorUpdateCount: number;
    isFetched: boolean;
    isFetchedAfterMount: boolean;
    isFetching: boolean;
    isInitialLoading: boolean;
    isPaused: boolean;
    isPlaceholderData: boolean;
    isPreviousData: boolean;
    isRefetching: boolean;
    isStale: boolean;
    refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>)) => Promise<QueryObserverResult<MeasurementData[], Error>>;
    remove: () => void;
    fetchStatus: FetchStatus
} => {
    const query = useMeasurements();
    return {
        ...query,
        data: query.data?.map(measurement => measurement.tankFillLevel),
    };
};

// If you need to filter by plant type, you can use this helper function
export const filterMeasurementsByPlantType = (measurements: MeasurementData[], plantType: string): MeasurementData[] => {
    return measurements.filter(measurement => measurement.plant === plantType);
};