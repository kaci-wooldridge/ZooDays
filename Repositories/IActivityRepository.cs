using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using ZooDays.Models;

namespace ZooDays.Repositories
{
    public interface IActivityRepository
    {
        Activity MakeActivity(SqlDataReader reader);
        ChosenActivity MakeChosenActivity(SqlDataReader reader);
        List<Activity> GetAll();
        Activity GetById(int id);
        List<ChosenActivity> GetByScheduleId(int id);
        void Add(ChosenActivity chosenActivity);
        void Delete(int chosenActivityId);
    }
}