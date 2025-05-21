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
                    await DatabaseService.InsertSensorDataAsync(sensorDataList);

                    var measurements = new List<SoilMeasurement>
                    {
                        new() { PlantId = 1, MeasureId = 1, Value = sensorDataList[0].SoilHumidity },
                        new() { PlantId = 2, MeasureId = 2, Value = sensorDataList[1].SoilHumidity }
                    };
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Client error: " + ex.Message);
            }
            finally
            {
                client.Close();
                TcpServer.ConnectedClients.Remove(client);
            }
        }
    }
}
