using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using ZooDays.Models;

namespace ZooDays.Repositories
{
    public interface IAnimalRepository
    {
        List<Animal> GetAll();
        Animal GetById(int id);
        Animal MakeAnimal(SqlDataReader reader);
        void Add(ChosenAnimal chosenAnimal);
        void Delete(int chosenAnimalId);
    }
}