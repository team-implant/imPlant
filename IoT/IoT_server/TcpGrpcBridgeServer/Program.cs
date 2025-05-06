using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using System.Net;
using System.Net.Sockets;
using System.Text;

namespace TcpGrpcBridgeServer;

class Program
{
    static async Task Main(string[] args)
    {
        // Run TCP and gRPC server in parallel
        Task tcpTask = StartTcpServerAsync();
        Task grpcTask = CreateGrpcHostBuilder(args).Build().RunAsync();

        await Task.WhenAll(tcpTask, grpcTask);
    }

    static async Task StartTcpServerAsync()
    {
        TcpListener server = new TcpListener(IPAddress.Any, 23);
        server.Start();
        Console.WriteLine("TCP Server started on port 23...");

        while (true)
        {
            TcpClient client = await server.AcceptTcpClientAsync();
            Console.WriteLine("TCP client connected!");
            _ = Task.Run(() => HandleClientAsync(client));
        }
    }

    static async Task HandleClientAsync(TcpClient client)
    {
        using NetworkStream stream = client.GetStream();
        TcpClientManager.ConnectedClients.Add(stream);

        byte[] buffer = new byte[1024];
        try
        {
            while (client.Connected)
            {
                int bytesRead = await stream.ReadAsync(buffer);
                if (bytesRead == 0) break;

                string msg = Encoding.ASCII.GetString(buffer, 0, bytesRead);
                Console.WriteLine($"Received from TCP client: {msg}");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"TCP client error: {ex.Message}");
        }

        Console.WriteLine("TCP client disconnected.");
    }

    public static IHostBuilder CreateGrpcHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.ConfigureKestrel(options =>
                {
                    // gRPC requires HTTP/2
                    options.Listen(IPAddress.Any, 5000, o => o.Protocols = Microsoft.AspNetCore.Server.Kestrel.Core.HttpProtocols.Http2);
                });
                webBuilder.UseStartup<Startup>();
            });
}
