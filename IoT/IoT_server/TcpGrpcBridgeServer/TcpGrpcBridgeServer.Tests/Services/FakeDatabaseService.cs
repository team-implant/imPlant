using TcpGrpcBridgeServer.Models;

public class FakeDatabaseService : IDatabaseService
{
    public List<SensorData> InsertedSensorData = new();
    public List<SoilMeasurement> InsertedMeasurements = new();
    public Dictionary<int, float> Thresholds = new();

    public Task InsertSensorDataAsync(List<SensorData> dataList)
    {
        InsertedSensorData.AddRange(dataList);
        return Task.CompletedTask;
    }

    public Task InsertSoilMeasurementsAsync(List<SoilMeasurement> measurements)
    {
        InsertedMeasurements.AddRange(measurements);
        return Task.CompletedTask;
    }

    public Task<bool> IsBelowThresholdAsync(int plantId, float currentValue)
    {
        return Task.FromResult(
            Thresholds.TryGetValue(plantId, out var threshold) && currentValue < threshold
        );
    }
}
