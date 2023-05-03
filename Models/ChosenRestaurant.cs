namespace ZooDays.Models
{
    public class ChosenRestaurant
    {
        public int Id { get; set; }
        public int ScheduleId { get; set; }
        public int RestaurantId { get; set; }
        public Restaurant Restaurant { get; set; }
    }
}
