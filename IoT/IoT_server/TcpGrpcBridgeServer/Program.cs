﻿using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using TcpGrpcBridgeServer.Network;


namespace TcpGrpcBridgeServer
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            Console.WriteLine("Starting TCP and gRPC servers...");
            // Run both TCP server and gRPC server concurrently
            Task tcpTask = TcpServer.StartAsync();
            Task grpcTask = CreateHostBuilder(args).Build().RunAsync();

            await Task.WhenAll(tcpTask, grpcTask);
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.ConfigureKestrel(options =>
                    {
                        // gRPC requires HTTP/2
                        options.Listen(System.Net.IPAddress.Any, 5000, listenOptions =>
                        {
                            listenOptions.Protocols = Microsoft.AspNetCore.Server.Kestrel.Core.HttpProtocols.Http2;
                        });
                    });
                    webBuilder.UseStartup<Startup>();  // This will use your Startup.cs configuration for gRPC
                });
    }
}
