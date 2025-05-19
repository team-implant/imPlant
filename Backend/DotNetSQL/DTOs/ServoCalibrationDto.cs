using System;

namespace DotNetSQL.DTOs
{
    public class ServoCalibrationDto
    {
        public int Id { get; set; }
        public int PlantId { get; set; }
        public DateTime Timestamp { get; set; }
        public double Angle { get; set; }
    }
}
