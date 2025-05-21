namespace DotNetSQL.Entities
{
    public class SoilMeasurement
    {
        public int PlantId { get; set; }
        public int MeasurementId { get; set; }
        public double Value { get; set; }

        // Navigation properties
        public Plant? Plant { get; set; }
        public MeasurementData? MeasurementData { get; set; }
    }
}
