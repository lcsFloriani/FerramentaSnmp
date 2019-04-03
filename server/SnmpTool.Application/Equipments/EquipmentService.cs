using SnmpTool.Domain.Equipments;
using SnmpTool.Domain.Snmp;
using SnmpTool.Infra.SnmpReader.Equipments;

namespace SnmpTool.Application.Equipments
{
    public class EquipmentService : IEquipmentService
    {
        public Equipment GetEquipment(SnmpManager snmpManager)
        {
            if(snmpManager.SnmpVersion == SnmpVersionEnum.V1)
            {
                var reader = new EquipmentReaderV1(snmpManager);
                return reader.GetEquipment();
            }
            else if (snmpManager.SnmpVersion == SnmpVersionEnum.V2)
            {
                var reader = new EquipmentReaderV2(snmpManager);
                return reader.GetEquipment();
            }
            else
            {
                var reader = new EquipmentReaderV3(snmpManager);
                return reader.GetEquipment();
            }
        }
        public Interface GetInterfaceById(SnmpManager snmpManager, int interfaceId)
        {
            if (snmpManager.SnmpVersion == SnmpVersionEnum.V1)
            {
                var reader = new EquipmentReaderV1(snmpManager);
                return reader.GetInterfaceById(interfaceId);
            }
            else if (snmpManager.SnmpVersion == SnmpVersionEnum.V2)
            {
                var reader = new EquipmentReaderV2(snmpManager);
                return reader.GetInterfaceById(interfaceId);
            }
            else
            {
                var reader = new EquipmentReaderV3(snmpManager);
                return reader.GetInterfaceById(interfaceId);
            }
        }
    }
}
