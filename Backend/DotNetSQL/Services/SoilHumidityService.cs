using DotNetSQL.DTOs;
using DotNetSQL.EFC;
using DotNetSQL.Entities;
using Microsoft.EntityFrameworkCore;
using DotNetSQL.IServices;

public class SoilHumidityService : ISoilHumidityService
{
    private readonly AppDbContext _context;

    public SoilHumidityService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<SoilHumidityDto> AddSoilHumidityAsync(SoilHumidityDto soilHumidityDto)
    {
        var entity = new SoilHumidity
        {
            PlantId = soilHumidityDto.PlantId,
            Position = soilHumidityDto.Position,
            MinThreshold = soilHumidityDto.MinThreshold,
            Timestamp = soilHumidityDto.Timestamp
        };

        _context.SoilHumidities.Add(entity);
        await _context.SaveChangesAsync();

        soilHumidityDto.Id = entity.Id;
        return soilHumidityDto;
    }

    public async Task<IEnumerable<SoilHumidityDto>> GetSoilHumidityAsync()
    {
        return await _context.SoilHumidities
            .Select(m => new SoilHumidityDto
            {
                Id = m.Id,
                PlantId = m.PlantId,
                Position = m.Position, // Renamed from MinValue
                Timestamp = m.Timestamp
            })
            .ToListAsync();
    }

    public async Task<SoilHumidityDto?> GetSoilHumidityByIdAsync(int id)
    {
        return await _context.SoilHumidities
            .Where(m => m.Id == id)
            .Select(m => new SoilHumidityDto
            {
                Id = m.Id,
                PlantId = m.PlantId,
                Position = m.Position, // Renamed from MinValue
                Timestamp = m.Timestamp
            })
            .FirstOrDefaultAsync();
    }
}
