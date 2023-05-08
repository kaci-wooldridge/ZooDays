using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using ZooDays.Models;
using ZooDays.Utils;

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

        public ChosenActivity MakeChosenActivity(SqlDataReader reader)
        {
            return new ChosenActivity()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                ActivityId = reader.GetInt32(reader.GetOrdinal("ActivityId")),
                ScheduleId = reader.GetInt32(reader.GetOrdinal("ScheduleId")),
                Activity = new Activity()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("ActivityId")),
                    Name = reader.GetString(reader.GetOrdinal("Name")),
                    ImageUrl = reader.GetString(reader.GetOrdinal("ImageUrl")),
                    Description = reader.GetString(reader.GetOrdinal("Description"))
                }
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

        public List<ChosenActivity> GetByScheduleId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT 
                        ca.Id, ca.ActivityId, ca.ScheduleId, 
                        a.[Name], a.ImageUrl, a.Description
                        FROM ChosenActivity ca
                        LEFT JOIN Activity a ON ca.ActivityId = a.Id
                        WHERE ca.ScheduleId = @id
                        ORDER BY a.[Name]
                        ";

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    var activities = new List<ChosenActivity>();
                    while (reader.Read())
                    {
                        activities.Add(MakeChosenActivity(reader));
                    }
                    reader.Close();
                    return activities;
                }
            }
        }

        public void Add(ChosenActivity chosenActivity)
        {
            if (chosenActivity == null)
            {
                throw new ArgumentNullException(nameof(chosenActivity));
            }

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                IF NOT EXISTS
                (
                    SELECT ca.ActivityId, ca.ScheduleId
                    FROM ChosenActivity ca
                    WHERE ca.ActivityId = @ActivityId AND ca.ScheduleId = @ScheduleId
                )
                BEGIN
                INSERT INTO ChosenActivity (ActivityId, ScheduleId)
                OUTPUT INSERTED.ID
                VALUES (@ActivityId, @ScheduleId)
                END";
                    DbUtils.AddParameter(cmd, "@ActivityId", chosenActivity.ActivityId);
                    DbUtils.AddParameter(cmd, "@ScheduleId", chosenActivity.ScheduleId);

                    var id = cmd.ExecuteScalar();
                    if (id != null)
                    {
                        chosenActivity.Id = (int)id;
                    }
                }
            }
        }

        public void Delete(int chosenActivityId)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            DELETE FROM ChosenActivity
                            WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", chosenActivityId);
                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
