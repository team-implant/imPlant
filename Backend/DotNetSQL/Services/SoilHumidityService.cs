using DotNetSQL.DTOs;
using DotNetSQL.EFC;
using DotNetSQL.Entities;
using Microsoft.EntityFrameworkCore;
public class SoilHumidityService : ISoilHumidityService
{
    private readonly AppDbContext _context;

    public SoilHumidityService(AppDbContext context)
    {
        _context = context;
    }

    // public async Task<SoilHumidityDto> AddSoilHumidityAsync(SoilHumidityDto soilHumidityDto)
    // {
    //     var entity = new MeasurementData
    //     {
    //         SoilHumidity = soilHumidityDto.SoilHumidity,
    //         Timestamp = soilHumidityDto.Timestamp,
    //         AirHumidity = 0,
    //         Temperature = 0,
    //         Light = 0
    //     };

    //     _context.MeasurementData.Add(entity);
    //     await _context.SaveChangesAsync();

    //     return new SoilHumidityDto
    //     {
    //         Id = entity.Id,
    //         SoilHumidity = entity.SoilHumidity,
    //         Timestamp = entity.Timestamp
    //     };
    // }

    public async Task<IEnumerable<SoilHumidityDto>> GetSoilHumidityAsync()
    {
        return await _context.MeasurementData
            .Select(m => new SoilHumidityDto
            {
                Id = m.Id,
                SoilHumidity = m.SoilHumidity,
                Timestamp = m.Timestamp
            })
            .ToListAsync();
    }

    public async Task<SoilHumidityDto?> GetSoilHumidityByIdAsync(int id)
    {
        return await _context.MeasurementData
            .Where(m => m.Id == id)
            .Select(m => new SoilHumidityDto
            {
                Id = m.Id,
                SoilHumidity = m.SoilHumidity,
                Timestamp = m.Timestamp
            })
            .FirstOrDefaultAsync();
    }
}
