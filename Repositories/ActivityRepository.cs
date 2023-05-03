﻿using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using ZooDays.Models;

namespace ZooDays.Repositories
{
    public class ActivityRepository : BaseRepository, IActivityRepository
    {
        public ActivityRepository(IConfiguration configuration) : base(configuration) { }

        public Activity MakeActivity(SqlDataReader reader)
        {
            return new Activity()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Name = reader.GetString(reader.GetOrdinal("Name")),
                Time = reader.GetDateTime(reader.GetOrdinal("Time")),
                ImageUrl = reader.GetString(reader.GetOrdinal("ImageUrl")),
                Description = reader.GetString(reader.GetOrdinal("Description"))
            };
        }

        public List<Activity> GetAll()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT a.id, a.Name, a.Time, a.ImageUrl, a.Description
                        FROM Activity a";
                    var reader = cmd.ExecuteReader();

                    var activities = new List<Activity>();
                    while (reader.Read())
                    {
                        activities.Add(MakeActivity(reader));
                    }
                    reader.Close();
                    return activities;
                }
            }
        }

        public Activity GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT a.id, a.Name, a.Time, a.ImageUrl, a.Description
                        FROM Activity a
                        WHERE a.id = @id";

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    Activity activity = null;
                    while (reader.Read())
                    {
                        if (activity == null)
                        {
                            activity = MakeActivity(reader);
                        }

                    }
                    reader.Close();
                    return activity;
                }
            }
        }
    }
}
