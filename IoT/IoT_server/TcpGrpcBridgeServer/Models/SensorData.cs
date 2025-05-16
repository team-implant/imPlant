namespace TcpGrpcBridgeServer.Models
{
    public class SensorData
    {
        public float Temperature { get; set; }
        public float AirHumidity { get; set; }
        public float SoilHumidity { get; set; }
        public float Light { get; set; }
        public float TankFillLevel { get; set; }
        public int SoilHumidityDetailsId { get; set; }
    }
}
