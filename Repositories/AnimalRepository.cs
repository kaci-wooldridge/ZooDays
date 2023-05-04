using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using ZooDays.Models;
using ZooDays.Utils;

namespace ZooDays.Repositories
{
    public class AnimalRepository : BaseRepository, IAnimalRepository
    {
        public AnimalRepository(IConfiguration configuration) : base(configuration) { }

        public Animal MakeAnimal(SqlDataReader reader)
        {
            return new Animal()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Name = reader.GetString(reader.GetOrdinal("Name")),
                ImageUrl = reader.GetString(reader.GetOrdinal("ImageUrl")),
                Description = reader.GetString(reader.GetOrdinal("Description"))
            };
        }

        public List<Animal> GetAll()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT a.id, a.Name, a.ImageUrl, a.Description
                        FROM Animal a";
                    var reader = cmd.ExecuteReader();

                    var animals = new List<Animal>();
                    while (reader.Read())
                    {
                        animals.Add(MakeAnimal(reader));
                    }
                    reader.Close();
                    return animals;
                }
            }
        }

        public List<Animal> GetAllImages()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT a.ImageUrl
                        FROM Animal a";
                    var reader = cmd.ExecuteReader();

                    var animals = new List<Animal>();
                    while (reader.Read())
                    {
                        animals.Add(MakeAnimal(reader));
                    }
                    reader.Close();
                    return animals;
                }
            }
        }

        public Animal GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT a.id, a.Name, a.ImageUrl, a.Description
                        FROM Animal a
                        WHERE a.id = @id";

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    Animal animal = null;
                    while (reader.Read())
                    {
                        if (animal == null)
                        {
                            animal = MakeAnimal(reader);
                        }

                    }
                    reader.Close();
                    return animal;
                }
            }
        }

        public void Add(ChosenAnimal chosenAnimal)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO ChosenAnimal (AnimalId, ScheduleId)
                        OUTPUT INSERTED.ID
                        VALUES (@AnimalId, @ScheduleId)";
                    DbUtils.AddParameter(cmd, "@AnimalId", chosenAnimal.AnimalId);
                    DbUtils.AddParameter(cmd, "@ScheduleId", chosenAnimal.ScheduleId);

                    chosenAnimal.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Delete(int chosenAnimalId)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            DELETE FROM ChosenAnimal
                            WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", chosenAnimalId);
                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
