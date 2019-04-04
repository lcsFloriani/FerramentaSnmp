using SnmpTool.Application.Equipments.Commands;
using SnmpTool.Application.Equipments.Queries;
using SnmpTool.Domain.Equipments;
using SnmpTool.Domain.Snmp;

namespace SnmpTool.Application.Equipments
{
    public interface IEquipmentService
    {
        EquipmentFullQuery GetFullEquipment(SnmpManagerCommand cmd);
        EquipmentResumedQuery GetResumedEquipment(SnmpManagerCommand cmd);
        InterfaceDetail GetInterfaceById(SnmpManagerCommand snmpManager, int interfaceId);
    }
}
