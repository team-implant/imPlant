namespace DotNetSQL.Entities
{
    public class MeasurementData
    {
        public int Id { get; set; }
        public double Temperature { get; set; }
        public double AirHumidity { get; set; }
        public double SoilHumidity { get; set; }
        public double LightIntensity { get; set; } 
        public DateTime Timestamp { get; set; }
        public double WaterPumpLevel { get; set; }
    }
}
