using DotNetSQL.Dtos;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DotNetSQL.IServices
{
    public interface ITemperatureTService
    {
        Task<IEnumerable<TemperatureDto>> GetAllTemperaturesAsync();
        Task<TemperatureDto?> GetTemperatureByIdAsync(int id);
        // Task<TemperatureDto> AddTemperatureAsync(TemperatureDto temperatureData);
    }
}
