using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using ZooDays.Models;
using ZooDays.Utils;

namespace ZooDays.Repositories
{
    public class RestaurantRepository : BaseRepository, IRestaurantRepository
    {
        public RestaurantRepository(IConfiguration configuration) : base(configuration) { }

        public Restaurant MakeRestaurant(SqlDataReader reader)
        {
            return new Restaurant()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Name = reader.GetString(reader.GetOrdinal("Name")),
                Cost = reader.GetString(reader.GetOrdinal("Cost")),
                ImageUrl = reader.GetString(reader.GetOrdinal("ImageUrl"))
            };
        }

        public ChosenRestaurant MakeChosenRestaurant(SqlDataReader reader)
        {
            return new ChosenRestaurant()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                RestaurantId = reader.GetInt32(reader.GetOrdinal("RestaurantId")),
                ScheduleId = reader.GetInt32(reader.GetOrdinal("ScheduleId")),
                Restaurant = new Restaurant()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("RestaurantId")),
                    Name = reader.GetString(reader.GetOrdinal("Name")),
                    ImageUrl = reader.GetString(reader.GetOrdinal("ImageUrl")),
                    Cost = reader.GetString(reader.GetOrdinal("Cost"))
                }
            };
        }

        public List<Restaurant> GetAll()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT r.id, r.Name, r.Cost, r.ImageUrl
                        FROM Restaurant r
                        ORDER BY r.Cost";
                    var reader = cmd.ExecuteReader();

                    var restaurants = new List<Restaurant>();
                    while (reader.Read())
                    {
                        restaurants.Add(MakeRestaurant(reader));
                    }
                    reader.Close();
                    return restaurants;
                }
            }
        }

        public Restaurant GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT r.id, r.Name, r.Cost, r.ImageUrl
                        FROM Restaurant r
                        WHERE r.id = @id";

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    Restaurant restaurant = null;
                    while (reader.Read())
                    {
                        if (restaurant == null)
                        {
                            restaurant = MakeRestaurant(reader);
                        }

                    }
                    reader.Close();
                    return restaurant;
                }
            }
        }

        public List<ChosenRestaurant> GetByScheduleId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT 
                        cr.Id, cr.RestaurantId, cr.ScheduleId, 
                        r.[Name], r.ImageUrl, r.Cost
                        FROM ChosenRestaurant cr
                        LEFT JOIN Restaurant r ON cr.RestaurantId = r.Id
                        WHERE cr.ScheduleId = @id
                        ORDER BY r.[Name]
                        ";

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    var restaurants = new List<ChosenRestaurant>();
                    while (reader.Read())
                    {
                        restaurants.Add(MakeChosenRestaurant(reader));
                    }
                    reader.Close();
                    return restaurants;
                }
            }
        }

        public void Add(ChosenRestaurant chosenRestaurant)
        {
            if (chosenRestaurant == null)
            {
                throw new ArgumentNullException(nameof(chosenRestaurant));
            }

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                IF NOT EXISTS
                (
                    SELECT cr.RestaurantId, cr.ScheduleId
                    FROM ChosenRestaurant cr
                    WHERE cr.RestaurantId = @RestaurantId AND cr.ScheduleId = @ScheduleId
                )
                BEGIN
                INSERT INTO ChosenRestaurant (RestaurantId, ScheduleId)
                OUTPUT INSERTED.ID
                VALUES (@RestaurantId, @ScheduleId)
                END";
                    DbUtils.AddParameter(cmd, "@RestaurantId", chosenRestaurant.RestaurantId);
                    DbUtils.AddParameter(cmd, "@ScheduleId", chosenRestaurant.ScheduleId);

                    var id = cmd.ExecuteScalar();
                    if (id != null)
                    {
                        chosenRestaurant.Id = (int)id;
                    }
                }
            }
        }

        public void Delete(int chosenRestaurantId)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            DELETE FROM ChosenRestaurant
                            WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", chosenRestaurantId);
                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
