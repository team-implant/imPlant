using DotNetSQL.Dtos;
using DotNetSQL.EFC;
using DotNetSQL.Entities;
using Microsoft.EntityFrameworkCore;

namespace DotNetSQL.Services
{
    public class TemperatureTService : ITemperatureTService
    {
        private readonly AppDbContext _context;

        public TemperatureTService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TemperatureDto>> GetAllTemperaturesAsync()
        {
            return await _context.MeasurementData.Select(q => new TemperatureDto{
                Id = q.Id,
                Temperature = q.Temperature,
                Timestamp = q.Timestamp,
            }).ToListAsync();
        }

        public async Task<TemperatureDto?> GetTemperatureByIdAsync(int id)
        {
            return await _context.MeasurementData.Where(q => q.Id == id).Select(q => new TemperatureDto{
                Id = q.Id,
                Temperature = q.Temperature,
                Timestamp = q.Timestamp,
            }).FirstOrDefaultAsync();
        }

       /* public async Task<TemperatureDto> AddTemperatureAsync(TemperatureDto temperatureData)
        {
            _context.MeasurementData.Add(temperatureData);
            await _context.SaveChangesAsync();
            return temperatureData;
        }*/
    }
}