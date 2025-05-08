using DotNetSQL.DTOs;
using System.Threading.Tasks;

namespace DotNetSQL.IServices
{
    public interface IMlPredictionService
    {
        Task<MlPredictionDto?> GetMlPredictionAsync();
    }
}
