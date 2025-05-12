using Microsoft.EntityFrameworkCore;
using DotNetSQL.EFC;
using DotNetSQL.Services;
using DotNetSQL.IServices;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                     .AddEnvironmentVariables();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IMeasurementService, MeasurementService>();
builder.Services.AddScoped<ITemperatureTService, TemperatureTService>();
builder.Services.AddScoped<ILightIntensityService, LightIntensityService>();
builder.Services.AddScoped<IAirHumidityService, AirHumidityService>();
builder.Services.AddScoped<ISoilHumidityService, SoilHumidityService>();
builder.Services.AddScoped<IWaterPumpService, WaterPumpService>();

var connection = builder.Configuration.GetConnectionString("DefaultConnection");

if (string.IsNullOrEmpty(connection))
{
    Console.WriteLine("ERROR: Connection string 'AZURE_SQL_CONNECTIONSTRING' not found.");
}
else
{
    Console.WriteLine($"Using connection string: {connection}");
}

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connection, sqlOptions =>
    {
        sqlOptions.EnableRetryOnFailure();
    }));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.UseCors("AllowFrontend");

app.MapControllers();

app.MapGet("/swagger", context =>
{
    context.Response.Redirect("/swagger/index.html");
    return Task.CompletedTask;
});

app.Run();
