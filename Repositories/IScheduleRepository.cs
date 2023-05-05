﻿using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using ZooDays.Models;

namespace ZooDays.Repositories
{
    public interface IScheduleRepository
    {
        List<Schedule> GetAll();
        Schedule GetById(int id);
        Schedule MakeSchedule(SqlDataReader reader);
        List<Schedule> GetSchedulesByUserId(int id);
        void Add(Schedule schedule);
        void Delete(int id);
        void Update(Schedule schedule);
    }
}