using DotNetSQL.DTOs;
using DotNetSQL.EFC;
using DotNetSQL.Entities;
using Microsoft.EntityFrameworkCore;
using DotNetSQL.IServices;

public class WaterPumpService : IWaterPumpService
{
    private readonly AppDbContext _context;

    public WaterPumpService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<WaterPumpDto>> GetWaterPumpAsync()
    {
        return await _context.MeasurementData
            .Select(m => new WaterPumpDto
            {
                Id = m.Id,
                Level = (float)m.WaterPumpLevel, 
                Timestamp = m.Timestamp
            })
            .ToListAsync();
    }

    public async Task<WaterPumpDto?> GetWaterPumpByIdAsync(int id)
    {
        return await _context.MeasurementData
            .Where(m => m.Id == id)
            .Select(m => new WaterPumpDto
            {
                Id = m.Id,
                Level = (float)m.WaterPumpLevel, 
                Timestamp = m.Timestamp
            })
            .FirstOrDefaultAsync();
    }
}
