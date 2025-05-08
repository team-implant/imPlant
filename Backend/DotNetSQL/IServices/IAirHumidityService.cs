using DotNetSQL.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DotNetSQL.IServices
{
    public interface IAirHumidityService
    {
        // Task<AirHumidityDto> AddAirHumidityAsync(AirHumidityDto airHumidityDto);
        Task<IEnumerable<AirHumidityDto>> GetAirHumidityAsync();
        Task<AirHumidityDto?> GetAirHumidityByIdAsync(int id);
    }
}
