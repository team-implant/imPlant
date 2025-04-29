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
    }
}