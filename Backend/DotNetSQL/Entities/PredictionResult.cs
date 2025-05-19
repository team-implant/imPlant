using System;

namespace DotNetSQL.Entities
{
    public class PredictionResult
    {
        public int Id { get; set; }
        public double Temperature { get; set; }
        public double AirHumidity { get; set; }
        public double SoilHumidity { get; set; }
        public string IrrigationRecommendation { get; set; } = string.Empty;
        public double LightIntensity { get; set; }
        public string PlantHealth { get; set; } = string.Empty;
        public DateTime Timestamp { get; set; }
    }
}
