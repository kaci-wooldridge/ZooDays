using System;
using System.Collections.Generic;

namespace ZooDays.Models
{
    public class Schedule
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Day { get; set; }
        public DateTime CreatedDate { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public List<Animal> ChosenAnimals { get; set; }
        public List<Activity> ChosenActivities { get; set; }
        public List<Restaurant> ChosenRestaurants { get; set; }
    }
}
