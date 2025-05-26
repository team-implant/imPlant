using DotNetSQL.DTOs;
using DotNetSQL.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DotNetSQL.IServices
{
    public interface IMeasurementService
    {
        Task<IEnumerable<MeasurementData>> GetAllMeasurementsAsync();
        Task<MeasurementData?> GetMeasurementByIdAsync(int id);
    }
}
