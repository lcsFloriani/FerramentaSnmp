namespace SnmpTool.Domain.Equipments
{
    public interface IEquipmentReader
    {
        Equipment GetEquipment();
        InterfaceDetail GetInterfaceDetail(int interfaceId);
    }
}
