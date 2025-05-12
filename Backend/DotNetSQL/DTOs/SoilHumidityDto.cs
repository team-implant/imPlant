namespace DotNetSQL.DTOs
{
    public class SoilHumidityDto
    {
        public int Id { get; set; }
        public double SoilHumidity { get; set; }
        public int MinValue { get; set; }
        public int MaxValue { get; set; }
        public DateTime Timestamp { get; set; }
        public int MeasurementDataId { get; set; }
    }
}