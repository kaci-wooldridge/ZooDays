using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
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
    }
}


