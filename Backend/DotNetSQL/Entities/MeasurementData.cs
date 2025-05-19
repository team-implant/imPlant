namespace DotNetSQL.Entities
{
    public class MeasurementData
    {
        public int Id { get; set; }
        public double Temperature { get; set; }
        public double AirHumidity { get; set; }
        public double SoilHumidity { get; set; }
        public double LightIntensity { get; set; }
        public double TankFillLevel { get; set; } // new property
        public DateTime Timestamp { get; set; }
        
        // Navigation property for SoilHumidity - marked as nullable
        public SoilHumidity? SoilHumidityDetails { get; set; }
    }
}
