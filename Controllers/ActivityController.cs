using Microsoft.AspNetCore.Mvc;
using ZooDays.Models;
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

        [HttpGet("chosenActivities/{id}")]
        public IActionResult GetByScheduleId(int id)
        {
            return Ok(_activityRepository.GetByScheduleId(id));
        }

        [HttpPost]
        public IActionResult AddChosenActivity(ChosenActivity chosenActivity)
        {
            _activityRepository.Add(chosenActivity);
            return CreatedAtAction(nameof(Get), new { id = chosenActivity.Id }, chosenActivity);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _activityRepository.Delete(id);
            return NoContent();
        }
    }
}
