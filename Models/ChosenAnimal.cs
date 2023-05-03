namespace ZooDays.Models
{
    public class ChosenAnimal
    {
        public int Id { get; set; }
        public int ScheduleId { get; set; }
        public int AnimalId { get; set; }
        public Animal Animal { get; set; }
    }
}
