using SnmpTool.Domain.Equipments;
using SnmpTool.Domain.Snmp;

namespace SnmpTool.Application.Equipments
{
    public interface IEquipmentService
    {
        Equipment GetEquipment(SnmpManager snmpManager);
    }
}
