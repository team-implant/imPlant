using DotNetSQL.DTOs;
using DotNetSQL.EFC;
using Microsoft.EntityFrameworkCore;
public class SoilHumidityService : ISoilHumidityService
{
    private readonly AppDbContext _context;

    public SoilHumidityService(AppDbContext context)
    {
        _context = context;
    }

   public async Task<IEnumerable<SoilHumidityDto>> GetSoilHumidityAsync()
        {
            return await _context.SoilHumidityDto.ToListAsync();
        }

        public async Task<SoilHumidityDto> AddSoilHumidityAsync(SoilHumidityDto soilHumidityDto)
        {
            _context.SoilHumidityDto.Add(soilHumidityDto);
            await _context.SaveChangesAsync();
            return soilHumidityDto;
        }
}
