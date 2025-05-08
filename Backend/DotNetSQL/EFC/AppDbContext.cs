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
        public DbSet<LightIntensityDTO> LightIntensity { get; set; }
        public DbSet<AirHumidityDto> AirHumidityDto { get; set; }
        public DbSet<SoilHumidityDto> SoilHumidityDto { get; set; }

         protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AirHumidityDto>(entity =>
            {
                entity.ToTable("AirHumidity");
                entity.Property(e => e.AirHumidity).HasColumnName("humidity"); 
            });

            modelBuilder.Entity<SoilHumidityDto>(entity =>
            {
                entity.ToTable("SoilHumidity");
                entity.Property(e => e.SoilHumidity).HasColumnName("soil"); 
            });
        }

    }
}
