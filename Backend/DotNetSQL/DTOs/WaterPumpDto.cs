using System;

namespace DotNetSQL.DTOs
{
    public class WaterPumpDto
    {
        public int Id { get; set; }
        public float Level { get; set; }
        public int MinLevel { get; set; }
        public int MaxLevel { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
