using System;

namespace ZooDays.Models
{
    public class Activity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Time { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }
    }
}
