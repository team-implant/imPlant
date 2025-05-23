using TcpGrpcBridgeServer.Models;

public interface IDatabaseService
{
    Task InsertSensorDataAsync(List<SensorData> dataList);
    Task InsertSoilMeasurementsAsync(List<SoilMeasurement> measurements);
    Task<bool> IsBelowThresholdAsync(int plantId, float currentValue);
}
