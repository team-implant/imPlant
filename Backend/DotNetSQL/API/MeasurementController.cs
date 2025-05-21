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
        private readonly IMeasurementService _temperatureService;

        public MeasurementController(IMeasurementService temperatureService)
        {
            _temperatureService = temperatureService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MeasurementData>>> GetAllMeasurements()
        {
            return Ok(await _temperatureService.GetAllMeasurementsAsync());
        }

        [HttpGet("by-plant/{plantId}")]
        public async Task<ActionResult<IEnumerable<MeasurementData>>> GetMeasurementsByPlantId(int plantId)
        {
            var allMeasurements = await _temperatureService.GetAllMeasurementsAsync();
            var filtered = allMeasurements.Where(m => m.PlantId == plantId).ToList();
            return Ok(filtered);
        }

        [HttpPost]
        public async Task<ActionResult<MeasurementData>> AddMeasurement(MeasurementData temperatureData)
        {
            var result = await _temperatureService.AddMeasurementAsync(temperatureData);
            return CreatedAtAction(nameof(GetMeasurement), new { id = result.Id }, result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MeasurementData>> GetMeasurement(int id)
        {
            var temperature = await _temperatureService.GetMeasurementByIdAsync(id);

            if (temperature == null)
            {
                return NotFound();
            }

            return temperature;
        }     
    }
}
