using Microsoft.EntityFrameworkCore;
using DotNetSQL.EFC;
using DotNetSQL.IServices;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using DotNetSQL.Services;
using DotNetSQL.GrpcClient;

var builder = WebApplication.CreateBuilder(args);

// Load config from JSON and environment variables
builder.Configuration
    .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
    .AddEnvironmentVariables();

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("Default", policy =>
        policy.WithOrigins(
            "http://localhost:5173",
            "http://localhost:5174",
            "https://electimore.xyz",
            "https://yellow-meadow-0d446e503.6.azurestaticapps.net" 
        )
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials());
});

// Controller support
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// Swagger & JWT integration
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter 'Bearer' followed by a space and your JWT token."
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

// Dependency Injection
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IMeasurementService, MeasurementService>();
builder.Services.AddScoped<ITemperatureTService, TemperatureTService>();
builder.Services.AddScoped<ILightIntensityService, LightIntensityService>();
builder.Services.AddScoped<IAirHumidityService, AirHumidityService>();
builder.Services.AddScoped<ISoilHumidityService, SoilHumidityService>();
builder.Services.AddScoped<IWaterPumpService, WaterPumpService>();
builder.Services.AddScoped<IPlantService, PlantService>();
builder.Services.AddScoped<IGrpcClientManager, GrpcClientManager>();

// Database Connection
var connection = Environment.GetEnvironmentVariable("AZURE_SQL_CONNECTIONSTRING")
               ?? builder.Configuration.GetConnectionString("DefaultConnection")
               ?? builder.Configuration.GetConnectionString("AZURE_SQL_CONNECTIONSTRING");

if (string.IsNullOrEmpty(connection))
{
    Console.WriteLine("❌ ERROR: Connection string not found.");
}
else
{
    Console.WriteLine("✅ Using SQL connection string.");
}

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connection, sqlOptions =>
    {
        sqlOptions.EnableRetryOnFailure();
    }));

// JWT Setup
var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var secretKey = jwtSettings["Secret"] ?? Environment.GetEnvironmentVariable("JWT_SECRET");

if (string.IsNullOrWhiteSpace(secretKey))
{
    throw new InvalidOperationException("❌ JWT Secret is not configured.");
}

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings["Issuer"],
        ValidAudience = jwtSettings["Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
    };
});

var app = builder.Build();

// Swagger (always enabled)
app.UseSwagger();
app.UseSwaggerUI();

// HTTPS & CORS
app.UseHttpsRedirection();
app.UseCors("Default");

// Authentication & Authorization
app.UseAuthentication();
app.UseAuthorization();

// Map routes
app.MapControllers();

// Health check
app.MapGet("/", () => "✅ Backend is alive!");

// Optional: redirect root to Swagger UI
app.MapGet("/swagger", context =>
{
    context.Response.Redirect("/swagger/index.html");
    return Task.CompletedTask;
});

app.Logger.LogInformation("🚀 Backend has started and is ready to serve requests.");

app.Run();
