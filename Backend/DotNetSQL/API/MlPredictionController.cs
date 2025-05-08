using Microsoft.AspNetCore.Mvc;
using DotNetSQL.IServices;
using DotNetSQL.DTOs;
using System.Threading.Tasks;
using DotNetSQL.Entities;

namespace DotNetSQL.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MlPredictionController : ControllerBase
    {
        private readonly IMlPredictionService _mlPredictionService;

        public MlPredictionController(IMlPredictionService mlPredictionService)
        {
            _mlPredictionService = mlPredictionService;
        }

        [HttpGet]
        public async Task<ActionResult<MlPredictionDto>> GetMlPrediction()
        {
            var result = await _mlPredictionService.GetMlPredictionAsync();
            if (result == null)
                return NotFound();
            return Ok(result);
        }
    }
}
