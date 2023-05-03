using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using ZooDays.Models;

namespace ZooDays.Repositories
{
    public interface IRestaurantRepository
    {
        List<Restaurant> GetAll();
        Restaurant GetById(int id);
        Restaurant MakeRestaurant(SqlDataReader reader);
    }
}