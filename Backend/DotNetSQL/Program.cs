using Microsoft.EntityFrameworkCore;
using DotNetSQL.EFC;
using DotNetSQL.Services;
using DotNetSQL.GrpcClient;

var builder = WebApplication.CreateBuilder(args);

// Add environment variables and config
builder.Configuration.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                     .AddEnvironmentVariables();

// CORS policy for frontend (adjust origin if needed)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173") // Adjust if different
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register MeasurementService and EF Core DbContext
builder.Services.AddScoped<IMeasurementService, MeasurementService>();


builder.Services.AddScoped<IGrpcClientManager, GrpcClientManager>();


// Get connection string (same logic for both Dev and Prod)
var connection = builder.Configuration.GetConnectionString("DefaultConnection");

if (string.IsNullOrEmpty(connection))
{
    Console.WriteLine("❌ ERROR: Connection string 'AZURE_SQL_CONNECTIONSTRING' not found.");
}
else
{
    Console.WriteLine($"✅ Using connection string: {connection}");
}

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connection, sqlOptions =>
    {
        sqlOptions.EnableRetryOnFailure();
    }));



var app = builder.Build();

// Enable Swagger only in Development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Enable middleware
app.UseHttpsRedirection();
app.UseAuthorization();
app.UseCors("AllowFrontend");

app.MapControllers();

// Optional redirect to Swagger UI
app.MapGet("/swagger", context =>
{
    context.Response.Redirect("/swagger/index.html");
    return Task.CompletedTask;
});

app.Run();
