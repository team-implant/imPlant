using DotNetSQL.DTOs;
using DotNetSQL.EFC;
using DotNetSQL.Entities;
using Microsoft.EntityFrameworkCore;
using DotNetSQL.IServices;

public class AirHumidityService : IAirHumidityService
{
    private readonly AppDbContext _context;

    public AirHumidityService(AppDbContext context)
    {
        _context = context;
    }

    // public async Task<AirHumidityDto> AddAirHumidityAsync(AirHumidityDto airHumidityDto)
    // {
    //     var entity = new MeasurementData
    //     {
    //         AirHumidity = airHumidityDto.AirHumidity,
    //         Timestamp = airHumidityDto.Timestamp,
    //         SoilHumidity = 0,
    //         Temperature = 0,
    //         Light = 0
    //     };

    //     _context.MeasurementData.Add(entity);
    //     await _context.SaveChangesAsync();

    //     return new AirHumidityDto
    //     {
    //         Id = entity.Id,
    //         AirHumidity = entity.AirHumidity,
    //         Timestamp = entity.Timestamp
    //     };
    // }



    public async Task<IEnumerable<AirHumidityDto>> GetAirHumidityAsync()
    {
        return await _context.MeasurementData
            .Select(m => new AirHumidityDto
            {
                Id = m.Id,
                AirHumidity = m.AirHumidity,
                Timestamp = m.Timestamp
            })
            .ToListAsync();
    }

    public async Task<AirHumidityDto?> GetAirHumidityByIdAsync(int id)
    {
        return await _context.MeasurementData
            .Where(m => m.Id == id)
            .Select(m => new AirHumidityDto
            {
                Id = m.Id,
                AirHumidity = m.AirHumidity,
                Timestamp = m.Timestamp
            })
            .FirstOrDefaultAsync();
    }
}
