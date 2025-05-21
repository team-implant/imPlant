using System;

namespace DotNetSQL.Entities
{
    public class PredictionResult
    {
        public int Id { get; set; }
        public string PredictionType { get; set; } = string.Empty; // e.g. "Temperature"
        public double Value { get; set; }
        public DateTime Timestamp { get; set; }
        public int? PlantId { get; set; }
        public int Batch { get; set; }

        // Navigation property
        public Plant? Plant { get; set; }
    }
}
