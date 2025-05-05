using DotNetSQL.Entities;

namespace DotNetSQL.Services
{
    public interface IMeasurementService
    {
        Task<IEnumerable<MeasurementData>> GetAllMeasurementsAsync();
        Task<MeasurementData?> GetMeasurementByIdAsync(int id);
        Task<MeasurementData> AddMeasurementAsync(MeasurementData temperatureData);
        Task<IEnumerable<MeasurementData>> GetAirHumidityAsync();
        Task<IEnumerable<MeasurementData>> GetSoilHumidityAsync();
    }
}