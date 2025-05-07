using DotNetSQL.Dtos;
using DotNetSQL.Entities;

namespace DotNetSQL.Services
{
    public interface ITemperatureTService
    {
        Task<IEnumerable<TemperatureDto>> GetAllTemperaturesAsync();
        Task<TemperatureDto?> GetTemperatureByIdAsync(int id);
       // Task<TemperatureDto> AddTemperatureAsync(TemperatureDto temperatureData);
    }
}