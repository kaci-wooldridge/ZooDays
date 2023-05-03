using Microsoft.AspNetCore.Mvc;
using ZooDays.Repositories;

namespace ZooDays.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivityController : ControllerBase
    {
        private readonly IActivityRepository _activityRepository;
        public ActivityController(IActivityRepository activityRepository)
        {
            _activityRepository = activityRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_activityRepository.GetAll());
        }

        [HttpGet("details/{id}")]
        public IActionResult GetById(int id)
        {
            return Ok(_activityRepository.GetById(id));
        }
    }
}
