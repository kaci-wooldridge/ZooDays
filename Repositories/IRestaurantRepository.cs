using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using ZooDays.Models;

namespace ZooDays.Repositories
{
    public interface IRestaurantRepository
    {
        Restaurant MakeRestaurant(SqlDataReader reader);
        ChosenRestaurant MakeChosenRestaurant(SqlDataReader reader);
        List<Restaurant> GetAll();
        Restaurant GetById(int id);
        List<ChosenRestaurant> GetByScheduleId(int id);
        void Add(ChosenRestaurant chosenRestaurant);
        void Delete(int chosenRestaurantId);
    }
}