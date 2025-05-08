using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using DotNetSQL.EFC;
using DotNetSQL.Entities;
using DotNetSQL.DTOs;
using DotNetSQL.IServices;

namespace DotNetSQL.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PredictionController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMlPredictionService _mlPredictionService;

        public PredictionController(AppDbContext context, IMlPredictionService mlPredictionService)
        {
            _context = context;
            _mlPredictionService = mlPredictionService;
        }

        [HttpPost("predict")]
        public async Task<IActionResult> Predict()
        {
            // Call ML prediction service
            var predictionResult = await _mlPredictionService.GetMlPredictionAsync();
            if (predictionResult == null)
                return BadRequest("Prediction failed.");

            // Map DTO to entity
            var predictionEntity = new Prediction
            {
                PredictionResult = predictionResult.Prediction,
                Confidence = predictionResult.Confidence,
                PlantId = predictionResult.PlantId,
                Timestamp = predictionResult.Timestamp
            };

            _context.Predictions.Add(predictionEntity);
            await _context.SaveChangesAsync();

            return Ok(predictionResult);
        }
    }
}