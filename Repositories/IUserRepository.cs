using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using ZooDays.Models;

namespace ZooDays.Repositories
{
    public interface IUserRepository
    {
        void Add(User user);
        List<User> GetAll();
        User GetByFirebaseUserId(string firebaseUserId);
        User GetById(int id);
        User MakeUser(SqlDataReader reader);
    }
}