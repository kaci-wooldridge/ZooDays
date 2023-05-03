using System.Collections.Generic;

namespace ZooDays.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FirebaseUserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public List<Schedule> Schedules { get; set; }
    }
}
