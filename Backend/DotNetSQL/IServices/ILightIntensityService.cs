using DotNetSQL.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DotNetSQL.IServices
{
    public interface ILightIntensityService
    {
        Task<IEnumerable<LightIntensityDTO>> GetAllLightIntensitiesAsync();
        Task<LightIntensityDTO?> GetLightIntensityByIdAsync(int id);
    }
}