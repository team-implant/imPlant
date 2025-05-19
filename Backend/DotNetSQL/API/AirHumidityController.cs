using Microsoft.AspNetCore.Mvc;
using DotNetSQL.DTOs;
using DotNetSQL.IServices;
using Microsoft.AspNetCore.Authorization;

namespace DotNetSQL.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/air-humidity")]
    public class AirHumidityController : ControllerBase
    {
        private readonly IAirHumidityService _airHumidityService;

        public AirHumidityController(IAirHumidityService service)
        {
            _airHumidityService = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AirHumidityDto>>> GetAirHumidity()
        {
            return Ok(await _airHumidityService.GetAirHumidityAsync());
        }

        [HttpGet("{id}")]
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
