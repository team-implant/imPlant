import {
  FetchStatus,
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useQuery,
  UseQueryResult
} from '@tanstack/react-query';

import axiosInstance from '../api/axiosInstance';

// Types
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

// Fetch all measurements
const fetchMeasurements = async (): Promise<MeasurementData[]> => {
  const response = await axiosInstance.get<MeasurementData[]>('/measurements');
  return response.data;
};

// Query for all measurements
export const useMeasurements = (): UseQueryResult<MeasurementData[], Error> => {
  return useQuery(['measurements'], fetchMeasurements);
};

// Shared return type
type MeasurementHook = {
  data: number[] | undefined;
  error: Error | null;
  isError: boolean;
  isLoading: boolean;
  isLoadingError: boolean;
  isRefetchError: boolean;
  isSuccess: boolean;
  status: 'error' | 'success' | 'loading';
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
  refetch: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>
  ) => Promise<QueryObserverResult<MeasurementData[], Error>>;
  remove: () => void;
  fetchStatus: FetchStatus;
};

// Helper to create hooks for specific fields
function createMeasurementHook(field: keyof MeasurementData): () => MeasurementHook {
  return () => {
    const query = useMeasurements();
    return {
      ...query,
      data: query.data?.map((m) => m[field] as number),
    };
  };
}

// Specific hooks
export const useTemperatures = createMeasurementHook('temperature');
export const useAirHumidity = createMeasurementHook('airHumidity');
export const useSoilHumidity = createMeasurementHook('soilHumidity');
export const useLightIntensity = createMeasurementHook('lightIntensity');
export const useTankFillLevel = createMeasurementHook('tankFillLevel');

// Optional filtering helper
export const filterMeasurementsByPlantType = (
  measurements: MeasurementData[],
  plantType: string
): MeasurementData[] => {
  return measurements.filter((m) => m.plant === plantType);
};
