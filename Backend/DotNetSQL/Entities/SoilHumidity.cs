using System;

namespace DotNetSQL.Entities
{
    public class SoilHumidity
    {
        public int Id { get; set; }
        public int PlantId { get; set; }

        private int _position;
        public int Position
        {
            get => _position;
            set
            {
                if (value != 0 && value != 1 && value != 2)
                    throw new ArgumentOutOfRangeException(nameof(Position), "Position must be 0, 1, or 2.");
                _position = value;
            }
        }

        public double MinThreshold { get; set; } // restored as before
        public DateTime Timestamp { get; set; }

       

        // Navigation property
        public Plant? Plant { get; set; }
    }
}
