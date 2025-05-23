using DotNetSQL.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DotNetSQL.IServices
{
    public interface ISoilHumidityService
    {
        Task<SoilHumidityDto> AddSoilHumidityAsync(SoilHumidityDto soilHumidityDto);
        Task<IEnumerable<SoilHumidityDto>> GetSoilHumidityAsync();
        Task<SoilHumidityDto?> GetSoilHumidityByIdAsync(int id);
    }
}
