using Microsoft.AspNetCore.SignalR;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public ChosenAnimal MakeChosenAnimal(SqlDataReader reader)
        {
            return new ChosenAnimal()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                AnimalId = reader.GetInt32(reader.GetOrdinal("AnimalId")),
                ScheduleId = reader.GetInt32(reader.GetOrdinal("ScheduleId")),
                Animal = new Animal()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("AnimalId")),
                    Name = reader.GetString(reader.GetOrdinal("Name")),
                    ImageUrl = reader.GetString(reader.GetOrdinal("ImageUrl")),
                    Description = reader.GetString(reader.GetOrdinal("Description"))
                }
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

        public List<ChosenAnimal> GetByScheduleId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT 
                        ca.Id, ca.AnimalId, ca.ScheduleId, 
                        a.[Name], a.ImageUrl, a.Description
                        FROM ChosenAnimal ca
                        LEFT JOIN Animal a ON ca.AnimalId = a.Id
                        WHERE ca.ScheduleId = @id
                        ORDER BY a.[Name]
                        ";

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    var animals = new List<ChosenAnimal>();
                    while (reader.Read())
                    {
                        animals.Add(MakeChosenAnimal(reader));
                    }
                    reader.Close();
                    return animals;
                }
            }
        }

        public void Add(ChosenAnimal chosenAnimal)
        {
            if (chosenAnimal == null)
            {
                throw new ArgumentNullException(nameof(chosenAnimal));
            }

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                IF NOT EXISTS
                (
                    SELECT ca.AnimalId, ca.ScheduleId
                    FROM ChosenAnimal ca
                    WHERE ca.AnimalId = @AnimalId AND ca.ScheduleId = @ScheduleId
                )
                BEGIN
                INSERT INTO ChosenAnimal (AnimalId, ScheduleId)
                OUTPUT INSERTED.ID
                VALUES (@AnimalId, @ScheduleId)
                END";
                    DbUtils.AddParameter(cmd, "@AnimalId", chosenAnimal.AnimalId);
                    DbUtils.AddParameter(cmd, "@ScheduleId", chosenAnimal.ScheduleId);

                    var id = cmd.ExecuteScalar();
                    if (id != null)
                    {
                        chosenAnimal.Id = (int)id;
                    }
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
