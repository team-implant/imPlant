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
        public DbSet<WaterPump> WaterPumps { get; set; }
        public DbSet<SoilHumidity> SoilHumidities { get; set; }
        public DbSet<User> Users => Set<User>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Fix any column mapping issues
            modelBuilder.Entity<MeasurementData>()
                .Property(m => m.LightIntensity)
                .HasColumnName("Light");

            // Set up relationship between MeasurementData and SoilHumidity
            // Updated to handle nullable navigation properties
            modelBuilder.Entity<SoilHumidity>()
                .HasOne(s => s.MeasurementData)
                .WithOne(m => m.SoilHumidityDetails)
                .HasForeignKey<SoilHumidity>(s => s.MeasurementDataId)
                .IsRequired(); // Foreign key is required even if navigation property is nullable

            // Add min/max columns to WaterPump
            modelBuilder.Entity<WaterPump>()
                .Property(w => w.MinLevel)
                .HasDefaultValue(0);

            modelBuilder.Entity<WaterPump>()
                .Property(w => w.MaxLevel)
                .HasDefaultValue(100);
        }
    }
}
