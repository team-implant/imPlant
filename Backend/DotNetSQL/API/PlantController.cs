using Microsoft.AspNetCore.Mvc;
using DotNetSQL.Entities;
using DotNetSQL.EFC;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace DotNetSQL.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/plants")]
    public class PlantController : ControllerBase
    {
        private readonly IPlantService _plantService;

        public PlantController(IPlantService plantService)
        {
            _plantService = plantService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Plant>>> GetAllPlants()
        {
            var plants = await _plantService.GetAllPlantsAsync();
            return Ok(plants);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Plant>> GetPlantById(int id)
        {
            var plant = await _plantService.GetPlantByIdAsync(id);
            if (plant == null)
                return NotFound();
            return Ok(plant);
        }

        [HttpGet("by-name/{name}")]
        public async Task<ActionResult<Plant>> GetPlantByName(string name)
        {
            var plant = await _plantService.GetPlantByNameAsync(name);
            if (plant == null)
                return NotFound();
            return Ok(plant);
        }
    }
}
