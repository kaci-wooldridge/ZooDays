namespace ZooDays.Models
{
    public class ChosenActivity
    {
        public int Id { get; set; }
        public int ScheduleId { get; set; }
        public int ActivityId { get; set; }
        public Activity Activity { get; set; }
    }
}
