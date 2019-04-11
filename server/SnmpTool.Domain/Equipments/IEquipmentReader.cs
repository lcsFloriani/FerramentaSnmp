using SnmpTool.Domain.Results;
using System;

namespace SnmpTool.Domain.Equipments
{
    public interface IEquipmentReader
    {
        Result<Exception, Equipment> GetEquipment();
        Result<Exception, InterfaceDetail> GetInterfaceDetail(int interfaceId);
    }
}
