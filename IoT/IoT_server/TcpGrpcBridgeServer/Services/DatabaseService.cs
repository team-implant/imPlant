using Microsoft.Data.SqlClient;
using TcpGrpcBridgeServer.Models;

namespace TcpGrpcBridgeServer.Services
{
    public static class DatabaseService
    {
        private const string ConnectionString = "Server=tcp:sep4-implant.database.windows.net,1433;" +
                                                "Initial Catalog=sep4-implant-db;" +
                                                "Persist Security Info=False;" +
                                                "User ID=systemUser;" +
                                                "Password=P@ssw0rdP@ssw0rd;" +
                                                "MultipleActiveResultSets=False;" +
                                                "Encrypt=True;" +
                                                "TrustServerCertificate=False;" +
                                                "Connection Timeout=30;";

        public static async Task InsertSensorDataAsync(List<SensorData> dataList)
        {
            await using var connection = new SqlConnection(ConnectionString);
            await connection.OpenAsync();

            foreach (var data in dataList)
            {
                var query = @"INSERT INTO MeasurementData 
                            (Temperature, AirHumidity, SoilHumidity, Light, tank_fill_level, SoilHumidityDetailsId) 
                            VALUES (@Temperature, @AirHumidity, @SoilHumidity, @Light, @TankFillLevel, @SoilHumidityDetailsId)";

                using var command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@Temperature", data.Temperature);
                command.Parameters.AddWithValue("@AirHumidity", data.AirHumidity);
                command.Parameters.AddWithValue("@SoilHumidity", data.SoilHumidity);
                command.Parameters.AddWithValue("@Light", data.Light);
                command.Parameters.AddWithValue("@TankFillLevel", data.TankFillLevel);
                command.Parameters.AddWithValue("@SoilHumidityDetailsId", data.SoilHumidityDetailsId);

                await command.ExecuteNonQueryAsync();
            }

            Console.WriteLine("Inserted sensor data.");
        }

        public static async Task InsertSoilMeasurementsAsync(List<SoilMeasurement> measurements)
        {
            await using var connection = new SqlConnection(ConnectionString);
            await connection.OpenAsync();

            foreach (var measurement in measurements)
            {
                var query = @"INSERT INTO Soil_Measurements 
                            (plant_id, measure_id, value) 
                            VALUES (@PlantId, @MeasureId, @Value)";

                using var command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@PlantId", measurement.PlantId);
                command.Parameters.AddWithValue("@MeasureId", measurement.MeasureId);
                command.Parameters.AddWithValue("@Value", measurement.Value);

                await command.ExecuteNonQueryAsync();
            }

            Console.WriteLine("Inserted soil measurements.");
        }

    }
}
