using DotNetSQL.DTOs;
using DotNetSQL.EFC;
using DotNetSQL.Entities;
using Microsoft.EntityFrameworkCore;

namespace DotNetSQL.Services
{
    public class MeasurementService : IMeasurementService
    {
        private readonly AppDbContext _context;

        public MeasurementService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<MeasurementData>> GetAllMeasurementsAsync()
        {
            return await _context.MeasurementData.ToListAsync();
        }

        public async Task<MeasurementData?> GetMeasurementByIdAsync(int id)
        {
            return await _context.MeasurementData.FindAsync(id);
        }

        public async Task<MeasurementData> AddMeasurementAsync(MeasurementData temperatureData)
        {
            _context.MeasurementData.Add(temperatureData);
            await _context.SaveChangesAsync();
            return temperatureData;
        }

        public async Task<IEnumerable<AirHumidityDto>> GetAirHumidityAsync()
        {
            return await _context.AirHumidityDto.ToListAsync();
        }

        public async Task<IEnumerable<SoilHumidityDto>> GetSoilHumidityAsync()
        {
            return await _context.SoilHumidityDto.ToListAsync();
        }

        public async Task<AirHumidityDto> AddAirHumidityAsync(AirHumidityDto airHumidityDto)
        {
            _context.AirHumidityDto.Add(airHumidityDto);
            await _context.SaveChangesAsync();
            return airHumidityDto;
        }

        public async Task<SoilHumidityDto> AddSoilHumidityAsync(SoilHumidityDto soilHumidityDto)
        {
            _context.SoilHumidityDto.Add(soilHumidityDto);
            await _context.SaveChangesAsync();
            return soilHumidityDto;
        }
    }
}