using System.Globalization;
using TcpGrpcBridgeServer.Models;

namespace TcpGrpcBridgeServer.Services
{
    public static class SensorDataParser
    {
        public static List<SensorData> ParseSensorData(string data)
        {
            // Split lines and ignore empty or "DATA" lines
            string[] lines = data.Replace("\r", "").Split('\n')
                         .Where(line => !string.IsNullOrWhiteSpace(line) && !line.StartsWith("DATA"))
                         .ToArray();
            string? temp = lines.FirstOrDefault(l => l.StartsWith("TEMP="))?.Split('=')[1].Replace("C", "").Trim();
            string? humidity = lines.FirstOrDefault(l => l.StartsWith("HUMIDITY="))?.Split('=')[1].Replace("%", "").Trim();
            string? light = lines.FirstOrDefault(l => l.StartsWith("LIGHT="))?.Split('=')[1].Replace("LUX", "").Trim();
            string? dist = lines.FirstOrDefault(l => l.StartsWith("DIST="))?.Split('=')[1].Replace("MM", "").Trim();
            string? soil1 = lines.FirstOrDefault(l => l.StartsWith("SOIL1="))?.Split('=')[1].Replace("%", "").Trim();
            string? soil2 = lines.FirstOrDefault(l => l.StartsWith("SOIL2="))?.Split('=')[1].Replace("%", "").Trim();

            if (temp == null || humidity == null || light == null || soil1 == null || soil2 == null)
                throw new FormatException("Missing sensor fields.");

            float temperature = float.Parse(temp, CultureInfo.InvariantCulture);
            float hum = float.Parse(humidity, CultureInfo.InvariantCulture);
            float lux = float.Parse(light, CultureInfo.InvariantCulture);
            float tank = float.TryParse(dist, out float d) ? d : 0;
            float soilVal1 = float.Parse(soil1, CultureInfo.InvariantCulture);
            float soilVal2 = float.Parse(soil2, CultureInfo.InvariantCulture);

            return new List<SensorData>
            {
                new() { Temperature = temperature, AirHumidity = hum, SoilHumidity = soilVal1, Light = lux, TankFillLevel = tank, SoilHumidityDetailsId = 1 },
                new() { Temperature = temperature, AirHumidity = hum, SoilHumidity = soilVal2, Light = lux, TankFillLevel = tank, SoilHumidityDetailsId = 2 }
            };
        }
    }
}
