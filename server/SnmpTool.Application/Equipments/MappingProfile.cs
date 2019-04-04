using AutoMapper;
using SnmpTool.Application.Equipments.Commands;
using SnmpTool.Application.Equipments.Queries;
using SnmpTool.Domain.Equipments;
using SnmpTool.Domain.Snmp;

namespace SnmpTool.Application.Equipments
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<SnmpManagerCommand, SnmpManager>();

            CreateMap<Equipment, EquipmentFullQuery>();
            CreateMap<Equipment, EquipmentResumedQuery>();
        }
    }
}
