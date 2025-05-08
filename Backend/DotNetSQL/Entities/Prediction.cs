using System;

namespace DotNetSQL.Entities
{
    public class Prediction
    {
        public int Id { get; set; }
        public string PredictionResult { get; set; }
        public double Confidence { get; set; }
        public int PlantId { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
