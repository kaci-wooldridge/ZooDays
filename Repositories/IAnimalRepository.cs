using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using ZooDays.Models;

namespace ZooDays.Repositories
{
    public interface IAnimalRepository
    {
        Animal MakeAnimal(SqlDataReader reader);
        ChosenAnimal MakeChosenAnimal(SqlDataReader reader);
        List<Animal> GetAll();
        Animal GetById(int id);
        List<ChosenAnimal> GetByScheduleId(int id);
        void Add(ChosenAnimal chosenAnimal);
        void Delete(int chosenAnimalId);
    }
}