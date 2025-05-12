using Microsoft.AspNetCore.Mvc;
using DotNetSQL.Entities;
using DotNetSQL.Services;
using DotNetSQL.Dtos;
using DotNetSQL.IServices; 

namespace DotNetSQL.Controllers
{
    [ApiController]
    [Route("api/temperature")]
    public class TemperatureController : ControllerBase
    {
        private readonly ITemperatureTService _temperatureService;

        public TemperatureController(ITemperatureTService temperatureService)
        {
            _temperatureService = temperatureService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TemperatureDto>>> GetAllTemperatures()
        {
            return Ok(await _temperatureService.GetAllTemperaturesAsync());
        }

        /*[HttpPost]
        public async Task<ActionResult<TemperatureDto>> AddTemperature(TemperatureDto temperatureData)
        {
            var result = await _temperatureService.AddTemperatureAsync(temperatureData);
            return CreatedAtAction(nameof(GetMeasurement), new { id = result.Id }, result);
        }*/

        [HttpGet("{id}")]
        public async Task<ActionResult<TemperatureDto>> GetTemperature(int id)
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