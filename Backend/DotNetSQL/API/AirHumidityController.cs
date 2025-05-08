using Microsoft.AspNetCore.Mvc;
using DotNetSQL.DTOs;
using DotNetSQL.IServices;

namespace DotNetSQL.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AirHumidityController : ControllerBase
    {
        private readonly IAirHumidityService _airHumidityService;

        public AirHumidityController(IAirHumidityService service)
        {
            _airHumidityService = service;
        }

        // [HttpPost("airHumidity")]
        // public async Task<ActionResult<AirHumidityDto>> AddAirHumidity(AirHumidityDto airHumidityDto)
        // {
        //     var result = await _airHumidityService.AddAirHumidityAsync(airHumidityDto);
        //     return CreatedAtAction(nameof(GetAirHumidity), new { id = result.Id }, result);
        // }

        [HttpGet("airHumidity")]
        public async Task<ActionResult<IEnumerable<AirHumidityDto>>> GetAirHumidity()
        {
            return Ok(await _airHumidityService.GetAirHumidityAsync());
        }

        [HttpGet("airHumidity/{id}")]
        public async Task<ActionResult<AirHumidityDto>> GetAirHumidityById(int id)
        {
            var airHumidity = await _airHumidityService.GetAirHumidityByIdAsync(id);
            if (airHumidity == null)
            {
                return NotFound();
            }

            return Ok(airHumidity);
        }

    }


}
