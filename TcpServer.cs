using System;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient; // Install Microsoft.Data.SqlClient

class TcpServer
{
    static async Task Main()
    {
        TcpListener server = new TcpListener(IPAddress.Any, 5000);
        server.Start();
        Console.WriteLine("Server started on port 5000...");

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
            byte[] buffer = new byte[1024];
            int bytes = await stream.ReadAsync(buffer, 0, buffer.Length);

            string received = Encoding.ASCII.GetString(buffer, 0, bytes);
            Console.WriteLine("Received: " + received);

            string reply = "Data received!";
            byte[] replyBytes = Encoding.ASCII.GetBytes(reply);
            await stream.WriteAsync(replyBytes, 0, replyBytes.Length);

            // Insert directly into Azure SQL
            await InsertDataIntoDatabaseAsync(received);
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
        string connectionString = "Server=tcp:sep4-implant.database.windows.net,1433;Initial Catalog=SEP4_imPlant_DB_2025-04-26T20-04Z;Persist Security Info=False;User ID=systemUser;Password=P@ssw0rdP@ssw0rd;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";

        using SqlConnection connection = new SqlConnection(connectionString);
        await connection.OpenAsync();

        string query = "INSERT INTO ToDoItems (Title, IsDone) VALUES (@Data, 0)"; // Assuming Title is a string and IsDone is a boolean (0 for false)

        using SqlCommand command = new SqlCommand(query, connection);
        command.Parameters.AddWithValue("@Data", data);

        int rowsAffected = await command.ExecuteNonQueryAsync();
        Console.WriteLine($"{rowsAffected} row(s) inserted into Azure SQL Database.");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error inserting data into Azure SQL: {ex.Message}");
    }
}
    
        private static void LogError(string message)
        {
            // Implement your logging logic here (e.g., write to a file, send to a logging service, etc.)
            Console.WriteLine($"Error: {message}");
        }
    }
// Note: Make sure to replace the connection string with your actual Azure SQL Database connection string.
// Ensure that the database and table (ToDoItems) exist in your Azure SQL Database before running this code.
// You can create the table using the following SQL command:
