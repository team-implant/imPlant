using DotNetSQL.Entities;

namespace DotNetSQL.Services
{
    public interface ITemperatureService
    {
        Task<IEnumerable<TemperatureData>> GetAllTemperaturesAsync();
        Task<TemperatureData?> GetTemperatureByIdAsync(int id);
        Task<TemperatureData> AddTemperatureAsync(TemperatureData temperatureData);
    }
}