using Microsoft.AspNetCore.Mvc;
using DotNetSQL.Entities;
using DotNetSQL.Services;
using DotNetSQL.Dtos;

namespace DotNetSQL.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LightIntensityController : ControllerBase
    {
        private readonly ILightIntensityTService _lightIntensityService;

        public LightIntensityController(ILightIntensityTService lightIntensityService)
        {
            _lightIntensityService = lightIntensityService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<LightIntensityDto>>> GetAllLightIntensities()
        {
            return Ok(await _lightIntensityService.GetAllLightIntensitiesAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<LightIntensityDto>> GetLightIntensity(int id)
        {
            var lightIntensity = await _lightIntensityService.GetLightIntensityByIdAsync(id);

            if (lightIntensity == null)
            {
                return NotFound();
            }

            return lightIntensity;
        }
    }
}