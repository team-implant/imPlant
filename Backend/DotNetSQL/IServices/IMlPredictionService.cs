using DotNetSQL.DTOs;
using System.Threading.Tasks;
using DotNetSQL.Entities;

namespace DotNetSQL.IServices
{
    public interface IMlPredictionService
    {
        Task<MlPredictionDto?> GetMlPredictionAsync();
    }
}
