using DotNetSQL.EFC;
using DotNetSQL.Entities;
using Microsoft.EntityFrameworkCore;

namespace DotNetSQL.Services
{
    public class TemperatureService : ITemperatureService
    {
        private readonly AppDbContext _context;

        public TemperatureService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TemperatureData>> GetAllTemperaturesAsync()
        {
            return await _context.TemperatureData.ToListAsync();
        }

        public async Task<TemperatureData?> GetTemperatureByIdAsync(int id)
        {
            return await _context.TemperatureData.FindAsync(id);
        }

        public async Task<TemperatureData> AddTemperatureAsync(TemperatureData temperatureData)
        {
            _context.TemperatureData.Add(temperatureData);
            await _context.SaveChangesAsync();
            return temperatureData;
        }
    }
}