import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dashboard from '../Dashboard';
import { useGetAllAirHumidity } from '../Hooks/useAirHumidity.js';
import { useGetAllTemperatures } from "../Hooks/useGetTemperature.js";
import { useGetAllSoilHumidity } from '../Hooks/useSoilHumidity.js';
import { useGetAllLightIntensity } from '../Hooks/useGetLightIntensity.js';
import { useWaterPumpData } from '../Hooks/waterpump/useWaterPump.js';

jest.mock('../Hooks/useAirHumidity.js');
jest.mock('../Hooks/useGetTemperature.js');
jest.mock('../Hooks/useSoilHumidity.js');
jest.mock('../Hooks/useGetLightIntensity.js');
jest.mock('../Hooks/waterpump/useWaterPump.js');

describe('Dashboard', () => {

  it('Should display loading state when fetching initial dashboard data', async () => {
    useGetAllAirHumidity.mockReturnValue({ data: null });
    useGetAllTemperatures.mockReturnValue({ data: null, loading: true });
    useGetAllSoilHumidity.mockReturnValue({ data: null, isLoading: true });
    useGetAllLightIntensity.mockReturnValue({ data: null, loading: true });
    useWaterPumpData.mockReturnValue({ data: null, loading: true });

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({})
    }));

    render(<Dashboard />);

    expect(screen.getByText('Loading dashboard data...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText('Loading dashboard data...')).not.toBeInTheDocument();
    });
  });

  it('Should show error message when failing to load dashboard data', async () => {
    const mockError = 'Failed to load dashboard data. Please try again later.';
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('API Error'));

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText(mockError)).toBeInTheDocument();
    });

    expect(screen.queryByText('Loading dashboard data...')).not.toBeInTheDocument();
    expect(screen.getByText('Status:')).toBeInTheDocument();
    expect(screen.getByText('Offline')).toBeInTheDocument();
  });

  it('Should update connection status to Online when sensor data is available', async () => {
    useGetAllAirHumidity.mockReturnValue({ data: [{ airHumidity: 50 }] });
    useGetAllTemperatures.mockReturnValue({ data: [{ temperature: 25 }] });
    useGetAllSoilHumidity.mockReturnValue({ data: [{ soilHumidity: 60 }] });
    useGetAllLightIntensity.mockReturnValue({ data: [{ lightIntensity: 500 }] });

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('Online')).toBeInTheDocument();
    });

    expect(screen.getByText('Online')).toHaveClass('status-online');
  });

  it('Should enlarge and minimize charts when clicked', async () => {
    useGetAllAirHumidity.mockReturnValue({ data: [{ airHumidity: 50, timestamp: new Date().toISOString() }] });
    useGetAllTemperatures.mockReturnValue({ data: [{ temperature: 25, timestamp: new Date().toISOString() }] });
    useGetAllSoilHumidity.mockReturnValue({ data: [{ soilHumidity: 60, timestamp: new Date().toISOString() }] });
    useGetAllLightIntensity.mockReturnValue({ data: [{ lightIntensity: 500, timestamp: new Date().toISOString() }] });

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.queryByText('Loading dashboard data...')).not.toBeInTheDocument();
    });

    const temperatureChart = screen.getByText('Temperature (24h) - Bell Pepper');
    expect(temperatureChart).not.toHaveClass('enlarged');

    await userEvent.click(temperatureChart);
    expect(screen.getByText('Temperature (24h)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: 'Close' });
    await userEvent.click(closeButton);
    expect(screen.queryByText('Temperature (24h)')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument();
  });

});
