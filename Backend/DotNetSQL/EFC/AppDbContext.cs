using Microsoft.EntityFrameworkCore;
using DotNetSQL.Entities;
using DotNetSQL.DTOs;

namespace DotNetSQL.EFC
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<MeasurementData> MeasurementData { get; set; }
        public DbSet<AirHumidityDto> AirHumidityDto { get; set; }
        public DbSet<SoilHumidityDto> SoilHumidityDto { get; set; }
    }
}
