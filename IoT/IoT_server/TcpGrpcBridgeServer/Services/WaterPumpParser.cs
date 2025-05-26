using DefaultNamespace;

namespace TcpGrpcBridgeServer.Services;

public class WaterPumpParser {
    public static PumpMeasurement ParsePumpMeasurement(string data) {
        string[] lines = data.Replace("\r", "").Split('\n')
            .Where(line => !string.IsNullOrWhiteSpace(line) && !line.StartsWith("WC"))
            .ToArray();
        string? min = lines.FirstOrDefault(l => l.StartsWith("EMPTY_WATER_LEVEL"))?.Split('=')[1].Trim();
        string? max = lines.FirstOrDefault(l => l.StartsWith("MAX_WATER_LEVEL"))?.Split('=')[1].Trim();
        if (min == null || max == null)
            throw new FormatException("Missing sensor fields.");
        return new(){EmptyWaterLevel = int.Parse(min), FullWaterLevel = int.Parse(max)};
    }
}