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

// Load configuration from JSON and environment variables
builder.Configuration
    .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
    .AddEnvironmentVariables();

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("Default", policy =>
        policy.WithOrigins("http://localhost:5173", "https://electimore.xyz")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials());
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// Swagger & JWT config
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

// Register services
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IMeasurementService, MeasurementService>();
builder.Services.AddScoped<ITemperatureTService, TemperatureTService>();
builder.Services.AddScoped<ILightIntensityService, LightIntensityService>();
builder.Services.AddScoped<IAirHumidityService, AirHumidityService>();
builder.Services.AddScoped<ISoilHumidityService, SoilHumidityService>();
builder.Services.AddScoped<IWaterPumpService, WaterPumpService>();
builder.Services.AddScoped<IPlantService, PlantService>();
builder.Services.AddScoped<IGrpcClientManager, GrpcClientManager>();

// ✅ Securely retrieve connection string
var connection = Environment.GetEnvironmentVariable("AZURE_SQL_CONNECTIONSTRING")
               ?? builder.Configuration.GetConnectionString("DefaultConnection")
               ?? builder.Configuration.GetConnectionString("AZURE_SQL_CONNECTIONSTRING");

if (string.IsNullOrEmpty(connection))
{
    Console.WriteLine("ERROR: Connection string not found.");
}
else
{
    Console.WriteLine("Using connection string.");
}

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connection, sqlOptions =>
    {
        sqlOptions.EnableRetryOnFailure();
    }));

// JWT Authentication
var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var secretKey = jwtSettings["Secret"] ?? Environment.GetEnvironmentVariable("JWT_SECRET");

if (string.IsNullOrWhiteSpace(secretKey))
{
    throw new InvalidOperationException("JWT Secret is not configured.");
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

// ✅ Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.UseCors("Default");

app.MapControllers();

// ✅ Health check endpoint
app.MapGet("/", () => "✅ Backend is alive!");

app.MapGet("/swagger", context =>
{
    context.Response.Redirect("/swagger/index.html");
    return Task.CompletedTask;
});

app.Run();
