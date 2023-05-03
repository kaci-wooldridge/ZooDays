using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using ZooDays.Models;

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
                Cost = reader.GetString(reader.GetOrdinal("Cost"))
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
                        SELECT r.id, r.Name, r.Cost
                        FROM Restaurant r";
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
                        SELECT r.id, r.Name, r.Cost
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
    }
}
