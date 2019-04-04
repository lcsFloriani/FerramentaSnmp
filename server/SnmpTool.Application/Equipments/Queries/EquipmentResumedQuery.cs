namespace SnmpTool.Application.Equipments.Queries
{
    public class EquipmentResumedQuery
    {
        public string Description { get; set; }
        public string Contact { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public string UpTime { get; set; }
        public double Temperature { get; set; }
        public int InterfacesCount { get; set; }
    }
}
