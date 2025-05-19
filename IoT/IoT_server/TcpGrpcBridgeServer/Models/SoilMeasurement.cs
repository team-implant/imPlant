namespace TcpGrpcBridgeServer.Models
{
    public class SoilMeasurement
    {
        public int PlantId { get; set; }
        public DateTime MeasureId { get; set; }
        public float Value { get; set; }
    }
}
