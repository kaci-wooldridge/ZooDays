using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using System;
using System.Security.Claims;
using ZooDays.Models;
using ZooDays.Repositories;

namespace ZooDays.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScheduleController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IScheduleRepository _scheduleRepository;
        public ScheduleController(IScheduleRepository scheduleRepository, IUserRepository userRepository)
        {
            _scheduleRepository = scheduleRepository;
            _userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_scheduleRepository.GetAll());
        }

        [HttpGet("details/{id}")]
        public IActionResult GetById(int id)
        {
            return Ok(_scheduleRepository.GetById(id));
        }

        private User GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);
        }

        [HttpPost]
        public IActionResult AddSchedule(Schedule schedule)
        {
            var user = GetCurrentUserProfile();
            schedule.UserId = user.Id;
            schedule.CreatedDate = DateTime.Now;
            _scheduleRepository.Add(schedule);
            return CreatedAtAction("Get", new { id = schedule.Id }, schedule);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _scheduleRepository.Delete(id);
            return NoContent();
        }

    }
}
