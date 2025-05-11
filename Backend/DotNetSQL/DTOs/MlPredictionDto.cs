namespace DotNetSQL.DTOs
{
    public class MlPredictionDto
    {
        public int Id { get; set; }
        public string Prediction { get; set; }
        public double Confidence { get; set; }
        public int PlantId { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
