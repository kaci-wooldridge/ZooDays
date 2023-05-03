using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ZooDays.Repositories;

namespace ZooDays.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestaurantController : ControllerBase
    {
        private readonly IRestaurantRepository _restaurantRepository;
        public RestaurantController(IRestaurantRepository restaurantRepository)
        {
            _restaurantRepository = restaurantRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_restaurantRepository.GetAll());
        }

        [HttpGet("details/{id}")]
        public IActionResult GetById(int id)
        {
            return Ok(_restaurantRepository.GetById(id));
        }
    }
}
