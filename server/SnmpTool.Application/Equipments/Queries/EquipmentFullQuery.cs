using SnmpTool.Domain.Equipments;
using System.Collections.Generic;

namespace SnmpTool.Application.Equipments.Queries
{
    public class EquipmentFullQuery
    {
        public string Description { get; set; }
        public string Contact { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public string UpTime { get; set; }
        public double Cpu { get; set; }
        public double Memory { get; set; }
        public int InterfacesCount { get; set; }
        public List<Interface> NetworkInterfaces { get; set; }
    }
}
