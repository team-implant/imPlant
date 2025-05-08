using DotNetSQL.DTOs;
using DotNetSQL.EFC;
using DotNetSQL.Entities; // <-- Add this line
using Microsoft.EntityFrameworkCore;
using DotNetSQL.IServices;



namespace DotNetSQL.Services
{
    public class MlPredictionService : IMlPredictionService
    {
        private readonly HttpClient _httpClient;
        private readonly AppDbContext _context;

        public MlPredictionService(HttpClient httpClient, AppDbContext context)
        {
            _httpClient = httpClient;
            _context = context;
        }

        public async Task<MlPredictionDto?> GetMlPredictionAsync()
        {
            // Replace with your actual Flask API URL if needed
            var response = await _httpClient.GetFromJsonAsync<MlPredictionDto>("http://localhost:5000/api/mlprediction");
            return response;
        }
    }
}
