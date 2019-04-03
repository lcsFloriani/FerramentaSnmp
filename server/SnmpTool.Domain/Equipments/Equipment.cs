using System;

namespace SnmpTool.Domain.Equipments
{
    public class Equipment
    {
        public string Description { get; set; }
        public string Contact { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public string UpTime { get; set; }
        public double Temperature { get; set; }
    }
}
