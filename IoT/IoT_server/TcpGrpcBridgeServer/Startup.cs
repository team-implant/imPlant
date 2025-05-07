using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using TcpGrpcBridgeServer.Services;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace TcpGrpcBridgeServer;

public class Startup
{
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddGrpc();
    }

    // 2. Start gRPC and TCP server
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            // Start TCP server as a background task
            Task.Run(() => TcpServer.StartAsync());

            app.UseEndpoints(endpoints =>
            {
                // Register your gRPC service implementation here
                endpoints.MapGrpcService<TcpBridgeService>();

                // Optional: Basic health check route
                endpoints.MapGet("/", async context =>
                {
                    await context.Response.WriteAsync("TCP+gRPC Server is running.");
                });
            });
        }
}
