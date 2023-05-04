using Azure;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using System.Collections.Generic;
using System.Linq;
using ZooDays.Models;
using ZooDays.Utils;

namespace ZooDays.Repositories
{
    public class ScheduleRepository : BaseRepository, IScheduleRepository
    {
        public ScheduleRepository(IConfiguration configuration) : base(configuration) { }

        public Schedule MakeSchedule(SqlDataReader reader)
        {
            return new Schedule()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Name = reader.GetString(reader.GetOrdinal("Name")),
                Day = reader.GetDateTime(reader.GetOrdinal("Day")),
                CreatedDate = reader.GetDateTime(reader.GetOrdinal("CreatedDate")),
                UserId = reader.GetInt32(reader.GetOrdinal("UserId")),
                User = new User()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("UserId")),
                    Name = reader.GetString(reader.GetOrdinal("userName"))
                },
                ChosenAnimals = new List<Animal>(),
                ChosenActivities = new List<Activity>(),
                ChosenRestaurants = new List<Restaurant>()
            };
        }

        public List<Schedule> GetAll()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT 
                        s.id, s.[Name], s.Day, s.CreatedDate, s.UserId,
                        u.[Name] AS userName,

                        cAnimal.id AS chosenAnimalId, cAnimal.AnimalId AS animalId,
                        Animal.[Name] AS animalName,

                        cActivity.id AS chosenActivityId, cActivity.ActivityId AS activityId, 
                        Activity.[Name] AS activityName,

                        cRestaurant.id AS chosenRestaurantId, cRestaurant.RestaurantId AS restaurantId,
                        Restaurant.[Name] AS restaurantName

                        FROM Schedule s
                        LEFT JOIN [User] u ON s.UserId = u.Id

                        LEFT JOIN ChosenAnimal cAnimal ON s.Id = cAnimal.ScheduleId
                        LEFT JOIN Animal ON cAnimal.AnimalId = Animal.id

                        LEFT JOIN ChosenActivity cActivity ON s.Id = cActivity.ScheduleId
                        LEFT JOIN Activity ON cActivity.ActivityId = Activity.id

                        LEFT JOIN ChosenRestaurant cRestaurant ON s.Id = cRestaurant.ScheduleId
                        LEFT JOIN Restaurant ON cRestaurant.RestaurantId = Restaurant.id";
                    var reader = cmd.ExecuteReader();

                    var schedules = new List<Schedule>();

                    while (reader.Read())
                    {
                        var scheduleId = DbUtils.GetInt(reader, "Id");
                        var existingSchedule = schedules.FirstOrDefault(s => s.Id == scheduleId);
                        if (existingSchedule == null)
                        {
                            existingSchedule = MakeSchedule(reader);
                            schedules.Add(existingSchedule);
                        }

                        if (DbUtils.IsNotDbNull(reader, "chosenAnimalId"))
                        {
                            var animalId = DbUtils.GetInt(reader, "animalId");
                            var existingAnimal = schedules[scheduleId - 1].ChosenAnimals.FirstOrDefault(a => a.Id == animalId);
                            if (existingAnimal == null)
                            {
                                existingSchedule.ChosenAnimals.Add(new Animal()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("animalId")),
                                    Name = reader.GetString(reader.GetOrdinal("animalName"))
                                });
                            }
                        }

                        if (DbUtils.IsNotDbNull(reader, "chosenActivityId"))
                        {
                            var activityId = DbUtils.GetInt(reader, "activityId");
                            var existingActivity = schedules[scheduleId - 1].ChosenActivities.FirstOrDefault(a => a.Id == activityId);
                            if (existingActivity == null)
                            {
                                existingSchedule.ChosenActivities.Add(new Activity()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("activityId")),
                                    Name = reader.GetString(reader.GetOrdinal("activityName"))
                                });
                            }
                        }

                        if (DbUtils.IsNotDbNull(reader, "chosenRestaurantId"))
                        {
                            var restaurantId = DbUtils.GetInt(reader, "restaurantId");
                            var existingRestaurant = schedules[scheduleId - 1].ChosenRestaurants.FirstOrDefault(a => a.Id == restaurantId);
                            if (existingRestaurant == null)
                            {
                                existingSchedule.ChosenRestaurants.Add(new Restaurant()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("restaurantId")),
                                    Name = reader.GetString(reader.GetOrdinal("restaurantName"))
                                });
                            }
                        }

                    }
                    reader.Close();
                    return schedules;
                }
            }
        }

        public Schedule GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT 
                        s.id, s.[Name], s.Day, s.CreatedDate, s.UserId,
                        u.[Name] AS userName,

                        cAnimal.id AS chosenAnimalId, cAnimal.AnimalId AS animalId,
                        Animal.[Name] AS animalName,

                        cActivity.id AS chosenActivityId, cActivity.ActivityId AS activityId, 
                        Activity.[Name] AS activityName,

                        cRestaurant.id AS chosenRestaurantId, cRestaurant.RestaurantId AS restaurantId,
                        Restaurant.[Name] AS restaurantName

                        FROM Schedule s
                        LEFT JOIN [User] u ON s.UserId = u.Id

                        LEFT JOIN ChosenAnimal cAnimal ON s.Id = cAnimal.ScheduleId
                        LEFT JOIN Animal ON cAnimal.AnimalId = Animal.id

                        LEFT JOIN ChosenActivity cActivity ON s.Id = cActivity.ScheduleId
                        LEFT JOIN Activity ON cActivity.ActivityId = Activity.id

                        LEFT JOIN ChosenRestaurant cRestaurant ON s.Id = cRestaurant.ScheduleId
                        LEFT JOIN Restaurant ON cRestaurant.RestaurantId = Restaurant.id
                        WHERE s.id = @id";

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    Schedule schedule = null;
                    while (reader.Read())
                    {
                        if (schedule == null)
                        {
                            schedule = MakeSchedule(reader);
                        }

                        if (DbUtils.IsNotDbNull(reader, "chosenAnimalId"))
                        {
                            var animalId = DbUtils.GetInt(reader, "animalId");
                            var existingAnimal = schedule.ChosenAnimals.FirstOrDefault(a => a.Id == animalId);
                            if (existingAnimal == null)
                            {
                                schedule.ChosenAnimals.Add(new Animal()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("animalId")),
                                    Name = reader.GetString(reader.GetOrdinal("animalName"))
                                });
                            }
                        }

                        if (DbUtils.IsNotDbNull(reader, "chosenActivityId"))
                        {
                            var activityId = DbUtils.GetInt(reader, "activityId");
                            var existingActivity = schedule.ChosenActivities.FirstOrDefault(a => a.Id == activityId);
                            if (existingActivity == null)
                            {
                                schedule.ChosenActivities.Add(new Activity()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("activityId")),
                                    Name = reader.GetString(reader.GetOrdinal("activityName"))
                                });
                            }
                        }

                        if (DbUtils.IsNotDbNull(reader, "chosenRestaurantId"))
                        {
                            var restaurantId = DbUtils.GetInt(reader, "restaurantId");
                            var existingRestaurant = schedule.ChosenRestaurants.FirstOrDefault(a => a.Id == restaurantId);
                            if (existingRestaurant == null)
                            {
                                schedule.ChosenRestaurants.Add(new Restaurant()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("restaurantId")),
                                    Name = reader.GetString(reader.GetOrdinal("restaurantName"))
                                });
                            }
                        }
                    }
                    reader.Close();
                    return schedule;
                }
            }
        }

        public List<Schedule> GetSchedulesByUserId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT 
                        s.id, s.[Name], s.Day, s.CreatedDate, s.UserId,
                        u.[Name] AS userName,

                        cAnimal.id AS chosenAnimalId, cAnimal.AnimalId AS animalId,
                        Animal.[Name] AS animalName,

                        cActivity.id AS chosenActivityId, cActivity.ActivityId AS activityId, 
                        Activity.[Name] AS activityName,

                        cRestaurant.id AS chosenRestaurantId, cRestaurant.RestaurantId AS restaurantId,
                        Restaurant.[Name] AS restaurantName

                        FROM Schedule s
                        LEFT JOIN [User] u ON s.UserId = u.Id

                        LEFT JOIN ChosenAnimal cAnimal ON s.Id = cAnimal.ScheduleId
                        LEFT JOIN Animal ON cAnimal.AnimalId = Animal.id

                        LEFT JOIN ChosenActivity cActivity ON s.Id = cActivity.ScheduleId
                        LEFT JOIN Activity ON cActivity.ActivityId = Activity.id

                        LEFT JOIN ChosenRestaurant cRestaurant ON s.Id = cRestaurant.ScheduleId
                        LEFT JOIN Restaurant ON cRestaurant.RestaurantId = Restaurant.id
                        WHERE s.UserId = @id";

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    var schedules = new List<Schedule>();
                    while (reader.Read())
                    {
                        var scheduleId = DbUtils.GetInt(reader, "Id");
                        var existingSchedule = schedules.FirstOrDefault(s => s.Id == scheduleId);
                        if (existingSchedule == null)
                        {
                            existingSchedule = MakeSchedule(reader);
                            schedules.Add(existingSchedule);
                        }

                        if (DbUtils.IsNotDbNull(reader, "chosenAnimalId"))
                        {
                            var animalId = DbUtils.GetInt(reader, "animalId");
                            var existingAnimal = schedules[scheduleId - 1].ChosenAnimals.FirstOrDefault(a => a.Id == animalId);
                            if (existingAnimal == null)
                            {
                                existingSchedule.ChosenAnimals.Add(new Animal()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("animalId")),
                                    Name = reader.GetString(reader.GetOrdinal("animalName"))
                                });
                            }
                        }

                        if (DbUtils.IsNotDbNull(reader, "chosenActivityId"))
                        {
                            var activityId = DbUtils.GetInt(reader, "activityId");
                            var existingActivity = schedules[scheduleId - 1].ChosenActivities.FirstOrDefault(a => a.Id == activityId);
                            if (existingActivity == null)
                            {
                                existingSchedule.ChosenActivities.Add(new Activity()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("activityId")),
                                    Name = reader.GetString(reader.GetOrdinal("activityName"))
                                });
                            }
                        }

                        if (DbUtils.IsNotDbNull(reader, "chosenRestaurantId"))
                        {
                            var restaurantId = DbUtils.GetInt(reader, "restaurantId");
                            var existingRestaurant = schedules[scheduleId - 1].ChosenRestaurants.FirstOrDefault(a => a.Id == restaurantId);
                            if (existingRestaurant == null)
                            {
                                existingSchedule.ChosenRestaurants.Add(new Restaurant()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("restaurantId")),
                                    Name = reader.GetString(reader.GetOrdinal("restaurantName"))
                                });
                            }
                        }

                    }
                    reader.Close();
                    return schedules;
                }
            }
        }

        public void Add(Schedule schedule)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Schedule (Name, Day, CreatedDate, UserId)
                        OUTPUT INSERTED.ID
                        VALUES (@Name, @Day, @CreatedDate, @UserId)";
                    DbUtils.AddParameter(cmd, "@Name", schedule.Name);
                    DbUtils.AddParameter(cmd, "@Day", schedule.Day);
                    DbUtils.AddParameter(cmd, "@CreatedDate", schedule.CreatedDate);
                    DbUtils.AddParameter(cmd, "@UserId", schedule.UserId);

                    schedule.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

    }
}
