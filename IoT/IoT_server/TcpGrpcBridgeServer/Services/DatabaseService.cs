using DefaultNamespace;
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
                          (Temperature, AirHumidity, SoilHumidity, Light, tank_fill_level, plant_id, TimeStamp) 
                          VALUES (@Temperature, @AirHumidity, @SoilHumidity, @Light, @TankFillLevel, @plant_id, @TimeStamp)";
                float x = await GetPumpPercentage(data.TankFillLevel);
                using var command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@Temperature", data.Temperature);
                command.Parameters.AddWithValue("@AirHumidity", data.AirHumidity);
                command.Parameters.AddWithValue("@SoilHumidity", data.SoilHumidity);
                command.Parameters.AddWithValue("@Light", data.Light);
                command.Parameters.AddWithValue("@TankFillLevel", float.ConvertToInteger<int>(x));
                command.Parameters.AddWithValue("@plant_id", data.SoilHumidityDetailsId);
                command.Parameters.AddWithValue("@TimeStamp", DateTime.Now);

                await command.ExecuteNonQueryAsync();
                Console.WriteLine($"Inserted data: {data.Temperature}, {data.AirHumidity}, {data.SoilHumidity}, {data.Light}, {float.ConvertToInteger<int>(x)}, {data.SoilHumidityDetailsId}");
            }
        }

        public async Task InsertWaterPump(PumpMeasurement pumpConfig)
        {
            await using var connection = new SqlConnection(_connectionString);
            await connection.OpenAsync();
            var query = @"INSERT INTO WaterPumps (MinLevel, MaxLevel, Timestamp) VALUES (@MinLevel, @MaxLevel, @TimeStamp)";

            using var command = new SqlCommand(query, connection);
            command.Parameters.AddWithValue("@MinLevel", pumpConfig.EmptyWaterLevel);
            command.Parameters.AddWithValue("@MaxLevel", pumpConfig.FullWaterLevel);
            command.Parameters.AddWithValue("@TimeStamp", DateTime.Now);

            await command.ExecuteNonQueryAsync();
            
        }

        public async Task<bool> IsBelowThresholdAsync(int plantId, float currentValue)
        {
            await using var connection = new SqlConnection(_connectionString);
            await connection.OpenAsync();

            var query = @"SELECT TOP 1 MinThreshold 
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
        public async Task<float> GetPumpPercentage(float currentPumpValue)
        {
            await using var connection = new SqlConnection(_connectionString);
            await connection.OpenAsync();

            var queryMin = @"SELECT TOP (1) MinLevel 
                FROM dbo.WaterPumps 
                ORDER BY Timestamp DESC";
            var queryMax = @"SELECT TOP (1) MaxLevel 
                FROM dbo.WaterPumps 
                ORDER BY Timestamp DESC";
            // using var command = new SqlCommand(query, connection);
            var resultMin = await new SqlCommand(queryMin, connection).ExecuteScalarAsync();
            var resultMax = await new SqlCommand(queryMax, connection).ExecuteScalarAsync();
            if (resultMin != null || resultMax != null) {
                int min = int.Parse(resultMin.ToString());
                int max = int.Parse(resultMax.ToString());
                return ((min - currentPumpValue) / (min - max)) * 100;
            }
            return 0;
        }
    }

}
