using System;

namespace DotNetSQL.Entities
{
    public class SoilHumidity
    {
        public int Id { get; set; }
        public double Value { get; set; }
        public int MinValue { get; set; }
        public int MaxValue { get; set; }
        public DateTime Timestamp { get; set; }
        
        // Foreign key to MeasurementData
        public int MeasurementDataId { get; set; }
        
        // Navigation property - marked as nullable
        public MeasurementData? MeasurementData { get; set; }
    }
}
