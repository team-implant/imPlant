using DotNetSQL.DTOs;
using DotNetSQL.IServices;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;

namespace DotNetSQL.Services
{
    public class MlPredictionService : IMlPredictionService
    {
        private readonly HttpClient _httpClient;

        public MlPredictionService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<MlPredictionDto?> GetMlPredictionAsync()
        {
            // Replace with your actual Flask API URL if needed
            var response = await _httpClient.GetFromJsonAsync<MlPredictionDto>("http://localhost:5000/api/mlprediction");
            return response;
        }
    }
}
