using System.Net;
using System.Net.Sockets;
using System.Text;
using Microsoft.Data.SqlClient;
using System.Globalization;

namespace TcpGrpcBridgeServer
{
    public class TcpServer
    {
        public static List<TcpClient> ConnectedClients { get; } = new();

        // 1. Start TCP server
        public static async Task StartAsync()
        {
            TcpListener server = new TcpListener(IPAddress.Any, 23);
            server.Start();
            Console.WriteLine("TCP Server started on port 23...");

            while (true)
            {
                TcpClient client = await server.AcceptTcpClientAsync();
                ConnectedClients.Add(client);
                Console.WriteLine("TCP client connected.");

                _ = Task.Run(() => HandleClientAsync(client));
            }
        }

        // 2. Handle incoming TCP client connections and process incoming data
        private static async Task HandleClientAsync(TcpClient client)
        {
            try
            {
                using NetworkStream stream = client.GetStream();
                while (client.Connected)
                {
                    byte[] buffer = new byte[1024];
                    int bytes = await stream.ReadAsync(buffer, 0, buffer.Length);

                    if (bytes == 0) break;

                    string received = Encoding.ASCII.GetString(buffer, 0, bytes);
                    Console.WriteLine("TCP received: " + received);

                    await InsertDataIntoDatabaseAsync(received);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("TCP client error: " + ex.Message);
            }
            finally
            {
                client.Close();
                ConnectedClients.Remove(client);
            }
        }

        // 3. Insert data into SQL database
        public static async Task InsertDataIntoDatabaseAsync(string data)
        {
            try
            {
                string[] lines = data.Replace("\r", "").Split('\n');

                string? tempLine = lines.FirstOrDefault(l => l.StartsWith("TEMP="));
                string? humidityLine = lines.FirstOrDefault(l => l.StartsWith("HUMIDITY="));
                string? lightLine = lines.FirstOrDefault(l => l.StartsWith("LIGHT="));
                string? soilLine = lines.FirstOrDefault(l => l.StartsWith("SOIL="));

                if (tempLine == null || humidityLine == null || lightLine == null || soilLine == null)
                {
                    Console.WriteLine("Error: TEMP, HUMIDITY, LIGHT, or SOIL missing.");
                    return;
                }

                string tempStr = tempLine.Substring("TEMP=".Length).Replace("C", "").Trim();
                string humidityStr = humidityLine.Substring("HUMIDITY=".Length).Replace("%", "").Trim();
                string lightStr = soilLine.Substring("LIGHT=".Length).Trim();
                string soilStr = soilLine.Substring("SOIL=".Length).Trim();

                if (!float.TryParse(tempStr, NumberStyles.Float, CultureInfo.InvariantCulture, out float temperature) ||
                    !float.TryParse(humidityStr, NumberStyles.Float, CultureInfo.InvariantCulture, out float humidity) ||
                    !float.TryParse(lightStr, NumberStyles.Float, CultureInfo.InvariantCulture, out float light) ||
                    !float.TryParse(soilStr, NumberStyles.Float, CultureInfo.InvariantCulture, out float soil))
                {
                    Console.WriteLine("Error parsing values.");
                    return;
                }

                string connectionString = "Server=tcp:sep4-implant.database.windows.net,1433;" +
                                        "Initial Catalog=sep4-implant-db;" +
                                        "Persist Security Info=False;" +
                                        "User ID=systemUser;" +
                                        "Password=P@ssw0rdP@ssw0rd;" +
                                        "MultipleActiveResultSets=False;" +
                                        "Encrypt=True;" +
                                        "TrustServerCertificate=False;" +
                                        "Connection Timeout=30;";

                using SqlConnection connection = new(connectionString);
                await connection.OpenAsync();

                string query = "INSERT INTO MeasurementData (Temperature, Humidity, Soil, Light) VALUES (@Temperature, @Humidity, @Soil, @Light)";
                using SqlCommand command = new(query, connection);
                command.Parameters.AddWithValue("@Temperature", temperature);
                command.Parameters.AddWithValue("@Humidity", humidity);
                command.Parameters.AddWithValue("@Light", light);
                command.Parameters.AddWithValue("@Soil", soil);

                await command.ExecuteNonQueryAsync();
                Console.WriteLine($"Inserted: Temp={temperature}, Humidity={humidity}, Light={light}, Soil={soil}");
            }
            catch (Exception ex)
            {
                Console.WriteLine("DB error: " + ex.Message);
            }
            finally
            {
                // Optionally, you can close the connection here if not using a using statement.
                // connection.Close();

            }
        }
    

    // 4. Send message to all connected TCP clients
    public static async Task SendMessageToTcpClientsAsync(string message)
    {
        byte[] data = Encoding.ASCII.GetBytes(message + "\n");

        foreach (var client in ConnectedClients.ToList()) // Copy to prevent collection modification issues
        {
            try
            {
                if (client.Connected)
                {
                    NetworkStream stream = client.GetStream();
                    await stream.WriteAsync(data, 0, data.Length);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error sending message to client: {ex.Message}");
            }
        }
    }
    }
}
