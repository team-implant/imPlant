using System;

namespace DotNetSQL.Entities
{
    public class ServoCalibration
    {
        public int Id { get; set; }
        public int PlantId { get; set; }
        public DateTime Timestamp { get; set; }
        public double Angle { get; set; }
    }
}
