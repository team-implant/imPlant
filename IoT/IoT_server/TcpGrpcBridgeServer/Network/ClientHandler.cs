using System.Net.Sockets;
using System.Text;
using TcpGrpcBridgeServer.Models;
using TcpGrpcBridgeServer.Services;

namespace TcpGrpcBridgeServer.Network
{
    public static class ClientHandler
    {
        public static async Task HandleClientAsync(TcpClient client)
        {
            try
            {
                using NetworkStream stream = client.GetStream();
                byte[] buffer = new byte[1024];

                while (client.Connected)
                {
                    int bytes = await stream.ReadAsync(buffer, 0, buffer.Length);
                    if (bytes == 0) break;

                    string received = Encoding.ASCII.GetString(buffer, 0, bytes);
                    Console.WriteLine("TCP received: " + received);

                    var sensorDataList = SensorDataParser.ParseSensorData(received);
                    var dbService = new DatabaseService("Server=tcp:sep4-implant.database.windows.net,1433;" +
                                                "Initial Catalog=sep4-implant-db;" +
                                                "Persist Security Info=False;" +
                                                "User ID=systemUser;" +
                                                "Password=P@ssw0rdP@ssw0rd;" +
                                                "MultipleActiveResultSets=False;" +
                                                "Encrypt=True;" +
                                                "TrustServerCertificate=False;" +
                                                "Connection Timeout=30;");
                    await dbService.InsertSensorDataAsync(sensorDataList);

                    // Create and insert measurements
                    var measurements = new List<SoilMeasurement>();

                    foreach (var sensorData in sensorDataList)
                    {
                        int plantId = sensorData.SoilHumidityDetailsId;
                        float soilHumidity = sensorData.SoilHumidity;

                        measurements.Add(new SoilMeasurement
                        {
                            PlantId = plantId,
                            MeasureId = plantId, // Adjust if MeasureId is different from PlantId
                            Value = soilHumidity
                        });

                        // Check against threshold
                        bool isBelow = await dbService.IsBelowThresholdAsync(plantId, soilHumidity);
                        if (isBelow)
                        {
                            string warningMessage = $"{plantId}\n";
                            byte[] data = Encoding.ASCII.GetBytes(warningMessage);
                            await stream.WriteAsync(data, 0, data.Length);
                            Console.WriteLine("Sent alert to client: " + warningMessage.Trim());
                        }
                    }

                    //await dbService.InsertSoilMeasurementsAsync(measurements);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Client error: " + ex.Message);
            }
        }
    }
}
