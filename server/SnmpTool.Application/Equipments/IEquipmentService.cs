using SnmpTool.Application.Equipments.Commands;
using SnmpTool.Application.Equipments.Queries;
using SnmpTool.Domain.Equipments;
using SnmpTool.Domain.Results;
using System;

namespace SnmpTool.Application.Equipments
{
    public interface IEquipmentService
    {
        Result<Exception, Equipment> GetFullEquipment(SnmpManagerCommand cmd);
        Result<Exception, InterfaceDetail> GetInterfaceById(SnmpManagerCommand snmpManager, int interfaceId);
    }
}
