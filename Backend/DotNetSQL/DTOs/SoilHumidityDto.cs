namespace DotNetSQL.DTOs
{
    public class SoilHumidityDto
    {
        public int Id { get; set; }
        public int PlantId { get; set; }
        public double MinValue { get; set; }
        public DateTime Timestamp { get; set; }
    }
}