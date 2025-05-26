namespace DotNetSQL.DTOs
{
    public class SoilHumidityDto
    {
        public int Id { get; set; }
        public int PlantId { get; set; }
        public int Position { get; set; } // Only 0, 1, or 2 allowed
        public double MinThreshold { get; set; }
        public DateTime Timestamp { get; set; }
    }
}