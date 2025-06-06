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
        public DbSet<ServoCalibration> ServoCalibrations { get; set; }
        public DbSet<Plant> Plants { get; set; } // new
        public DbSet<PredictionResult> PredictionResults { get; set; } // new


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Fix any column mapping issues
            modelBuilder.Entity<MeasurementData>()
                .Property(m => m.LightIntensity)
                .HasColumnName("Light");

            modelBuilder.Entity<MeasurementData>()
                .Property(m => m.TankFillLevel)
                .HasColumnName("tank_fill_level");
            modelBuilder.Entity<MeasurementData>()
                .Property(m => m.PlantId)
                .HasColumnName("plant_id");

            modelBuilder.Entity<MeasurementData>()
                .HasOne(m => m.Plant)
                .WithMany()
                .HasForeignKey(m => m.PlantId);

            // Add min/max columns to WaterPump
            modelBuilder.Entity<WaterPump>()
                .Property(w => w.MinLevel)
                .HasDefaultValue(0);

            modelBuilder.Entity<WaterPump>()
                .Property(w => w.MaxLevel)
                .HasDefaultValue(100);

            // Map SoilHumidity to Soil_Humidity_Thresholds
            modelBuilder.Entity<SoilHumidity>()
                .ToTable("Soil_Humidity_Thresholds")
                .Property(s => s.Position)
                .HasColumnName("Position");
            modelBuilder.Entity<SoilHumidity>()
                .Property(s => s.Timestamp)
                .HasColumnName("time");
            modelBuilder.Entity<SoilHumidity>()
                .Property(s => s.PlantId)
                .HasColumnName("plant_id");

            // ServoCalibration mapping
            modelBuilder.Entity<ServoCalibration>()
                .ToTable("Servo_Calibration");
            modelBuilder.Entity<ServoCalibration>()
                .Property(s => s.PlantId)
                .HasColumnName("plant_id");
            modelBuilder.Entity<ServoCalibration>()
                .Property(s => s.Timestamp)
                .HasColumnName("time");
            modelBuilder.Entity<ServoCalibration>()
                .Property(s => s.Angle)
                .HasColumnName("angle");

            // Plant table mapping
            modelBuilder.Entity<Plant>()
                .ToTable("Plants")
                .Property(p => p.Name)
                .HasColumnName("name");

            // PredictionResult table mapping
            modelBuilder.Entity<PredictionResult>()
                .ToTable("PredictionResults");
            modelBuilder.Entity<PredictionResult>()
                .Property(p => p.PredictionType)
                .HasColumnName("prediction_type");
            modelBuilder.Entity<PredictionResult>()
                .Property(p => p.Value)
                .HasColumnName("value");
            modelBuilder.Entity<PredictionResult>()
                .Property(p => p.Timestamp)
                .HasColumnName("timestamp");
            modelBuilder.Entity<PredictionResult>()
                .Property(p => p.PlantId)
                .HasColumnName("plant_id");
            modelBuilder.Entity<PredictionResult>()
                .Property(p => p.Batch)
                .HasColumnName("batch");
            modelBuilder.Entity<PredictionResult>()
                .HasOne(p => p.Plant)
                .WithMany()
                .HasForeignKey(p => p.PlantId)
                .OnDelete(DeleteBehavior.NoAction); // Prevents cascade delete issues with nullable FK
        }
    }
}
