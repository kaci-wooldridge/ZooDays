using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using ZooDays.Models;

namespace ZooDays.Repositories
{
    public interface IScheduleRepository
    {
        List<Schedule> GetAll();
        Schedule GetById(int id);
        Schedule MakeSchedule(SqlDataReader reader);
    }
}