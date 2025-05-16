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
        public async Task<ActionResult<string>> GreenHouseAction(int id)
        {
            var result = await _clientManager.GreenHouseControl(id);
            return Ok(result);
        }
    }
}