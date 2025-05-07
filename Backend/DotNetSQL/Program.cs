using Microsoft.EntityFrameworkCore;
using DotNetSQL.EFC;
using DotNetSQL.Services;  // Add this namespace import

var builder = WebApplication.CreateBuilder(args);

// Add CORS services
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});


// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// Register services before building the app
builder.Services.AddScoped<IMeasurementService, MeasurementService>();
builder.Services.AddScoped<ITemperatureTService, TemperatureTService>();
builder.Services.AddScoped<IAirHumidityService, AirHumidityService>();
builder.Services.AddScoped<ISoilHumidityService, SoilHumidityService>();



var connection = string.Empty;
if (builder.Environment.IsDevelopment())
{
    builder.Configuration.AddEnvironmentVariables().AddJsonFile("appsettings.Development.json");
    connection = builder.Configuration.GetConnectionString("AZURE_SQL_CONNECTIONSTRING");
}
else
{
    connection = Environment.GetEnvironmentVariable("AZURE_SQL_CONNECTIONSTRING");
}

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connection, sqlOptions =>
    {
        sqlOptions.EnableRetryOnFailure();
    }));

var app = builder.Build();
// Remove this line - it's now above before app.Build()
// builder.Services.AddScoped<IMeasurementService, MeasurementService>();

if (app.Environment.IsDevelopment())  // Add parentheses here
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.UseCors("AllowFrontend");

app.MapGet("/swagger", context =>
{
    context.Response.Redirect("/swagger/index.html");
    return Task.CompletedTask;
});

app.Run();

