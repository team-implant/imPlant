using System;

namespace DotNetSQL.DTOs
{
    public class WaterPumpDto
    {
        public int Id { get; set; }
        public float Level { get; set; } // Or bool Status if it's on/off
        public DateTime Timestamp { get; set; }
    }
}
