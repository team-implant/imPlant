using System;

namespace DotNetSQL.Entities
{
    public class WaterPump
    {
        public int Id { get; set; }
        public int MinLevel { get; set; }
        public int MaxLevel { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
