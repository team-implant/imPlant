using TcpGrpcBridgeServer.Models;

public class DatabaseServiceTests
{
    [Fact]
    public async Task IsBelowThresholdAsync_ReturnsTrue_WhenBelowThreshold()
    {
        // Arrange
        var fakeService = new FakeDatabaseService();
        fakeService.Thresholds[5] = 50.0f;

        // Act
        bool result = await fakeService.IsBelowThresholdAsync(5, 30.0f);

        // Assert
        Assert.True(result);
    }

    [Fact]
    public async Task InsertSensorDataAsync_AddsSensorDataToList()
    {
        // Arrange
        var fakeService = new FakeDatabaseService();
        var data = new List<SensorData>
        {
            new() { Temperature = 25, AirHumidity = 60, SoilHumidity = 40, Light = 300, TankFillLevel = 80, SoilHumidityDetailsId = 1 }
        };

        // Act
        await fakeService.InsertSensorDataAsync(data);

        // Assert
        Assert.Single(fakeService.InsertedSensorData);
        Assert.Equal(25, fakeService.InsertedSensorData.First().Temperature);
    }
}
