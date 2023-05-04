using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using ZooDays.Models;

namespace ZooDays.Repositories
{
    public interface IActivityRepository
    {
        List<Activity> GetAll();
        Activity GetById(int id);
        Activity MakeActivity(SqlDataReader reader);
        void Add(ChosenActivity chosenActivity);
        void Delete(int chosenActivityId);
    }
}