using System;

namespace DotNetSQL.Entities
{
    public class SoilHumidity
    {
        public int Id { get; set; }
        public int PlantId { get; set; }
        public double MinValue { get; set; }
        public DateTime Timestamp { get; set; }

        // Foreign key to MeasurementData
        public int MeasurementDataId { get; set; }
        public MeasurementData? MeasurementData { get; set; }

        // Navigation property
        public Plant? Plant { get; set; }
    }
}
