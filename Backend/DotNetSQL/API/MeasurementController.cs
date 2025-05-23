using Microsoft.AspNetCore.Mvc;
using DotNetSQL.Entities;
using DotNetSQL.Services;
using DotNetSQL.DTOs;
using DotNetSQL.IServices;
using Microsoft.AspNetCore.Authorization;

namespace DotNetSQL.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/measurements")]
    public class MeasurementController : ControllerBase
    {
        private readonly IMeasurementService _measurementService;

        public MeasurementController(IMeasurementService measurementService)
        {
            _measurementService = measurementService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MeasurementData>>> GetAllMeasurements()
        {
            return Ok(await _measurementService.GetAllMeasurementsAsync());
        }

        [HttpGet("by-plant/{plantId}")]
        public async Task<ActionResult<IEnumerable<MeasurementData>>> GetMeasurementsByPlantId(int plantId)
        {
            var allMeasurements = await _measurementService.GetAllMeasurementsAsync();
            var filtered = allMeasurements.Where(m => m.PlantId == plantId).ToList();
            return Ok(filtered);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MeasurementData>> GetMeasurementById(int id)
        {
            var measurement = await _measurementService.GetMeasurementByIdAsync(id);
            if (measurement == null)
                return NotFound();
            return Ok(measurement);
        }
    }
}
