using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ZooDays.Models;
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

        [HttpPost]
        public IActionResult AddChosenRestaurant(ChosenRestaurant chosenRestaurant)
        {
            _restaurantRepository.Add(chosenRestaurant);
            return CreatedAtAction(nameof(Get), new { id = chosenRestaurant.Id }, chosenRestaurant);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _restaurantRepository.Delete(id);
            return NoContent();
        }
    }
}
