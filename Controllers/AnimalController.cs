using Microsoft.AspNetCore.Mvc;
using ZooDays.Models;
using ZooDays.Repositories;

namespace ZooDays.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnimalController : ControllerBase
    {
        private readonly IAnimalRepository _animalRepository;
        public AnimalController(IAnimalRepository animalRepository)
        {
            _animalRepository = animalRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_animalRepository.GetAll());
        }

        [HttpGet("details/{id}")]
        public IActionResult GetById(int id)
        {
            return Ok(_animalRepository.GetById(id));
        }

        [HttpPost]
        public IActionResult AddChosenAnimal(ChosenAnimal chosenAnimal)
        {
            _animalRepository.Add(chosenAnimal);
            return CreatedAtAction(nameof(Get), new { id = chosenAnimal.Id }, chosenAnimal);
        }
    }
}


