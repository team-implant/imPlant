using Microsoft.AspNetCore.Mvc;
using DotNetSQL.DTOs;
using DotNetSQL.IServices;
using Microsoft.AspNetCore.Authorization;

namespace DotNetSQL.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/water-pump")]
    public class WaterPumpController : ControllerBase
    {
        private readonly IWaterPumpService _waterPumpService;

        public WaterPumpController(IWaterPumpService service)
        {
            _waterPumpService = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<WaterPumpDto>>> GetWaterPump()
        {
            return Ok(await _waterPumpService.GetWaterPumpAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<WaterPumpDto>> GetWaterPumpById(int id)
        {
            var result = await _waterPumpService.GetWaterPumpByIdAsync(id);
            if (result == null)
                return NotFound();
            return Ok(result);
        }
    }
}
