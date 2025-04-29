using Microsoft.AspNetCore.Mvc;
using DotNetSQL.Entities;
using DotNetSQL.Services;

namespace DotNetSQL.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TemperatureController : ControllerBase
    {
        private readonly ITemperatureService _temperatureService;

        public TemperatureController(ITemperatureService temperatureService)
        {
            _temperatureService = temperatureService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TemperatureData>>> GetAllTemperatures()
        {
            return Ok(await _temperatureService.GetAllTemperaturesAsync());
        }

        [HttpPost]
        public async Task<ActionResult<TemperatureData>> AddTemperature(TemperatureData temperatureData)
        {
            var result = await _temperatureService.AddTemperatureAsync(temperatureData);
            return CreatedAtAction(nameof(GetTemperature), new { id = result.Id }, result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TemperatureData>> GetTemperature(int id)
        {
            var temperature = await _temperatureService.GetTemperatureByIdAsync(id);

            if (temperature == null)
            {
                return NotFound();
            }

            return temperature;
        }
    }
}