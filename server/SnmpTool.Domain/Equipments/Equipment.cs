using System.Collections.Generic;

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
        public int InterfacesCount { get; set; }
        public List<Interface> NetworkInterfaces { get; set; }
        
        public Equipment()
        {
            NetworkInterfaces = new List<Interface>();
        }
    }
}
