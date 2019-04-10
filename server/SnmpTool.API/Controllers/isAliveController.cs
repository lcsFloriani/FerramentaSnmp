using Microsoft.AspNetCore.Mvc;

namespace SnmpTool.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class isAliveController : ControllerBase
    {
        [HttpGet]
        public IActionResult IsApiAlive()        
            => Ok();        
    }
}