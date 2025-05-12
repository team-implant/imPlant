using Microsoft.AspNetCore.Mvc;
using DotNetSQL.DTOs;
using DotNetSQL.IServices;

namespace DotNetSQL.Controllers
{
    [ApiController]
    [Route("api/soil-humidity")]
    public class SoilHumidityController : ControllerBase
    {
        private readonly ISoilHumidityService _soilHumidityService;

        public SoilHumidityController(ISoilHumidityService service)
        {
            _soilHumidityService = service;
        }

        // [HttpPost]
        // public async Task<ActionResult<SoilHumidityDto>> AddSoilHumidity(SoilHumidityDto soilHumidityDto)
        // {
        //     // ...existing code...
        // }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SoilHumidityDto>>> GetSoilHumidity()
        {
            return Ok(await _soilHumidityService.GetSoilHumidityAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSoilHumidityById(int id)
        {
            var soilHumidity = await _soilHumidityService.GetSoilHumidityByIdAsync(id);
            if (soilHumidity == null)
            {
                return NotFound();
            }

            return Ok(soilHumidity);
        }
    }
}
