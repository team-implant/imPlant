using System;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using System.Globalization;
using System.Linq;

class TcpServer
{
    static async Task Main()
    {
        // Fixed the missing parenthesis in TcpListener initialization
        TcpListener server = new TcpListener(IPAddress.Any, 23);
        server.Start();
        Console.WriteLine("Server started on port 23...");

        while (true)
        {
            TcpClient client = await server.AcceptTcpClientAsync();
            Console.WriteLine("Client connected!");

            _ = Task.Run(() => HandleClientAsync(client));
        }
    }

    private static async Task HandleClientAsync(TcpClient client)
    {
        try
        {
            using NetworkStream stream = client.GetStream();
            while (client.Connected)
            {
                byte[] buffer = new byte[1024];
                int bytes = await stream.ReadAsync(buffer, 0, buffer.Length);

                string received = Encoding.ASCII.GetString(buffer, 0, bytes);
                Console.WriteLine("Received: " + received);

                await InsertDataIntoDatabaseAsync(received);
            }            
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error handling client: {ex.Message}");
        }
        finally
        {
            client.Close();
        }
    }

    private static async Task InsertDataIntoDatabaseAsync(string data)
    {
        try
        {
            // Normalize line endings and split lines
            string[] lines = data.Replace("\r", "").Split('\n');

            string? tempLine = lines.FirstOrDefault(line => line.StartsWith("TEMP="));
            string? humidityLine = lines.FirstOrDefault(line => line.StartsWith("HUMIDITY="));

            if (tempLine == null || humidityLine == null)
            {
                LogError("TEMP or HUMIDITY line is missing.");
                return;
            }

            string tempStr = tempLine.Substring("TEMP=".Length).Replace("C", "").Trim();
            string humidityStr = humidityLine.Substring("HUMIDITY=".Length).Replace("%", "").Trim();

            if (!float.TryParse(tempStr, NumberStyles.Float, CultureInfo.InvariantCulture, out float temperature))
            {
                LogError($"Failed to parse temperature: '{tempStr}'");
                return;
            }

            if (!float.TryParse(humidityStr, NumberStyles.Float, CultureInfo.InvariantCulture, out float humidity))
            {
                LogError($"Failed to parse humidity: '{humidityStr}'");
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

            using SqlConnection connection = new SqlConnection(connectionString);
            await connection.OpenAsync();

            string query = "INSERT INTO MeasurementData (Temperature, Humidity) VALUES (@Temperature, @Humidity)";
            using SqlCommand command = new SqlCommand(query, connection);
            command.Parameters.AddWithValue("@Temperature", temperature);
            command.Parameters.AddWithValue("@Humidity", humidity);

            int rowsAffected = await command.ExecuteNonQueryAsync();
            Console.WriteLine($"Inserted: Temperature={temperature}, Humidity={humidity}");
            Console.WriteLine($"{rowsAffected} row(s) inserted into MeasurementData table.");
        }
        catch (Exception ex)
        {
            LogError($"Database insert error: {ex.Message}");
        }
    }

    private static void LogError(string message)
    {
        // Extend this to write to a log file if needed
        Console.WriteLine($"Error: {message}");
    }
}
