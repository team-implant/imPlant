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
        return await _context.WaterPumps
            .Select(wp => new WaterPumpDto
            {
                Id = wp.Id,
                Level = wp.Level,
                MinLevel = wp.MinLevel,
                MaxLevel = wp.MaxLevel,
                Timestamp = wp.Timestamp
            })
            .ToListAsync();
    }

    public async Task<WaterPumpDto?> GetWaterPumpByIdAsync(int id)
    {
        return await _context.WaterPumps
            .Where(wp => wp.Id == id)
            .Select(wp => new WaterPumpDto
            {
                Id = wp.Id,
                Level = wp.Level,
                MinLevel = wp.MinLevel,
                MaxLevel = wp.MaxLevel,
                Timestamp = wp.Timestamp
            })
            .FirstOrDefaultAsync();
    }
}
