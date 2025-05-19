using System;

namespace DotNetSQL.Entities
{
    public class SoilHumidity
    {
        public int Id { get; set; }
        public int PlantId { get; set; }
        public double MinValue { get; set; }
        public DateTime Timestamp { get; set; }

        // Navigation property
        public Plant Plant { get; set; }
    }
}
