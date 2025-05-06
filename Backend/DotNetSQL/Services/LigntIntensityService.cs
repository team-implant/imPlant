namespace DefaultNamespace;

using DotNetSQL.Dtos;
using DotNetSQL.EFC;
using DotNetSQL.Entities;
using Microsoft.EntityFrameworkCore;


public class LightIntensityService : ILightIntensityService
{
    private readonly AppDbContext _context;

    public LightIntensityService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<LightIntensityDto>> GetAllLightIntensitiesAsync()
    {
        return await _context.MeasurementData.Select(q => new LightIntensityDto{
            Id = q.Id,
            LightIntensity = q.LightIntensity,
            Timestamp = q.Timestamp,
        }).ToListAsync();
    }

    public async Task<LightIntensityDto?> GetLightIntensityByIdAsync(int id)
    {
        return await _context.MeasurementData.Where(q => q.Id == id).Select(q => new LightIntensityDto{
            Id = q.Id,
            LightIntensity = q.LightIntensity,
            Timestamp = q.Timestamp,
        }).FirstOrDefaultAsync();
    }
}