using System;

namespace DotNetSQL.DTOs
{
    public class PredictionResultDto
    {
        public int Id { get; set; }
        public double Temperature { get; set; }
        public double AirHumidity { get; set; }
        public double SoilHumidity { get; set; }
        public string IrrigationRecommendation { get; set; }
        public double LightIntensity { get; set; }
        public string PlantHealth { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
