using Microsoft.AspNetCore.Mvc;
using DotNetSQL.GrpcClient;

namespace DotNetSQL.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ActionsController : ControllerBase
    {
        private readonly IGrpcClientManager _clientManager;

        public ActionsController(IGrpcClientManager clientManager)
        {
            _clientManager = clientManager;
        }

        [HttpPost]
        public async Task<ActionResult<string>> WaterPump(int id)
        {
            var result = await _clientManager.IrrigationControl(id);
            return Ok(result);
        }
    }
}