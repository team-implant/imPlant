using Microsoft.AspNetCore.Mvc;
using DotNetSQL.DTOs;
using DotNetSQL.IServices;
using Microsoft.AspNetCore.Authorization;

namespace DotNetSQL.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/light-intensity")]
    public class LightIntensityController : ControllerBase
    {
        private readonly ILightIntensityService _lightIntensityService;

        public LightIntensityController(ILightIntensityService lightIntensityService)
        {
            _lightIntensityService = lightIntensityService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<LightIntensityDTO>>> GetAllLightIntensities()
        {
            return Ok(await _lightIntensityService.GetAllLightIntensitiesAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<LightIntensityDTO>> GetLightIntensity(int id)
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