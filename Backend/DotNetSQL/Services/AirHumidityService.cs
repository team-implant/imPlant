using DotNetSQL.DTOs;
using DotNetSQL.EFC;
using Microsoft.EntityFrameworkCore;
public class AirHumidityService : IAirHumidityService
{
    private readonly AppDbContext _context;

    public AirHumidityService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<AirHumidityDto> AddAirHumidityAsync(AirHumidityDto airHumidityDto)
        {
            _context.AirHumidityDto.Add(airHumidityDto);
            await _context.SaveChangesAsync();
            return airHumidityDto;
        }


    public async Task<IEnumerable<AirHumidityDto>> GetAirHumidityAsync()
    {
        return await _context.AirHumidityDto.ToListAsync();
    }
}
