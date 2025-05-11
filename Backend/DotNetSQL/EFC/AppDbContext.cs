using Microsoft.EntityFrameworkCore;
using DotNetSQL.Entities;

namespace DotNetSQL.EFC
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<MeasurementData> MeasurementData { get; set; }
        public DbSet<LightIntensityDTO> LightIntensity { get; set; }
        public DbSet<AirHumidityDto> AirHumidityDto { get; set; }
        public DbSet<SoilHumidityDto> SoilHumidityDto { get; set; }
        public DbSet<WaterPump> WaterPumps { get; set; }
        public DbSet<Prediction> Predictions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
