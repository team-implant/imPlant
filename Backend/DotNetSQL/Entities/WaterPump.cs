using System;

namespace DotNetSQL.Entities
{
    public class WaterPump
    {
        public int Id { get; set; }
        public float Level { get; set; } // Or bool Status if needed
        public DateTime Timestamp { get; set; }
    }
}
