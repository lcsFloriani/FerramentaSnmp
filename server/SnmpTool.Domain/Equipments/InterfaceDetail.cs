using System;

namespace SnmpTool.Domain.Equipments
{
    public class InterfaceDetail
    {
        public double UtilizationRate { get; set; }
        public double ErrorIn { get; set; }
        public double ErrorOut { get; set; }
        public double DiscardIn { get; set; }
        public double DiscardOut { get; set; }
    }
}
