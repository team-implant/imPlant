using Microsoft.Data.SqlClient;
using TcpGrpcBridgeServer.Models;

namespace TcpGrpcBridgeServer.Services
{
    public class DatabaseService : IDatabaseService
    {
        private readonly string _connectionString;

        public DatabaseService(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task InsertSensorDataAsync(List<SensorData> dataList)
        {
            await using var connection = new SqlConnection(_connectionString);
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
        }

        // public async Task InsertSoilMeasurementsAsync(List<SoilMeasurement> measurements)
        // {
        //     await using var connection = new SqlConnection(_connectionString);
        //     await connection.OpenAsync();

        //     foreach (var measurement in measurements)
        //     {
        //         var query = @"INSERT INTO Soil_Measurements 
        //                   (plant_id, measure_id, value) 
        //                   VALUES (@PlantId, @MeasureId, @Value)";

        //         using var command = new SqlCommand(query, connection);
        //         command.Parameters.AddWithValue("@PlantId", measurement.PlantId);
        //         command.Parameters.AddWithValue("@MeasureId", measurement.MeasureId);
        //         command.Parameters.AddWithValue("@Value", measurement.Value);

        //         await command.ExecuteNonQueryAsync();
        //     }
        // }

        public async Task<bool> IsBelowThresholdAsync(int plantId, float currentValue)
        {
            await using var connection = new SqlConnection(_connectionString);
            await connection.OpenAsync();

            var query = @"SELECT TOP 1 min_threshold 
                      FROM dbo.Soil_Humidity_Thresholds 
                      WHERE plant_id = @PlantId 
                      ORDER BY time DESC";

            using var command = new SqlCommand(query, connection);
            command.Parameters.AddWithValue("@PlantId", plantId);

            var result = await command.ExecuteScalarAsync();

            return result != null &&
                   float.TryParse(result.ToString(), out float threshold) &&
                   currentValue < threshold;
        }
    }

}
