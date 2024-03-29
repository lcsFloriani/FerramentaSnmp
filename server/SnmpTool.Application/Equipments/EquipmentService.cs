﻿using AutoMapper;
using SnmpTool.Application.Equipments.Commands;
using SnmpTool.Application.Equipments.Queries;
using SnmpTool.Domain.Equipments;
using SnmpTool.Domain.Results;
using SnmpTool.Domain.Snmp;
using SnmpTool.Infra.SnmpReader.Equipments;
using System;

namespace SnmpTool.Application.Equipments
{
    public class EquipmentService : IEquipmentService
    {
        public Result<Exception, Equipment> GetFullEquipment(SnmpManagerCommand cmd)
        {
            var snmpManager = Mapper.Map<SnmpManagerCommand, SnmpManager>(cmd);

            if (snmpManager.SnmpVersion == SnmpVersionEnum.V1)
            {
                var reader = new EquipmentReaderV1(snmpManager);
                //return Mapper.Map<Equipment, EquipmentFullQuery>(reader.GetEquipment());
                return reader.GetEquipment();
            }
            else //snmpManager.SnmpVersion == SnmpVersionEnum.V2
            {
                var reader = new EquipmentReaderV2(snmpManager);
                //return Mapper.Map<Equipment, EquipmentFullQuery>(reader.GetEquipment());
                return reader.GetEquipment();
            }
        }
        public Result<Exception, InterfaceDetail> GetInterfaceById(SnmpManagerCommand cmd, int interfaceId)
        {
            var snmpManager = Mapper.Map<SnmpManagerCommand, SnmpManager>(cmd);
            if (snmpManager.SnmpVersion == SnmpVersionEnum.V1)
            {
                var reader = new EquipmentReaderV1(snmpManager);
                return reader.GetInterfaceDetail(interfaceId);
            }
            else //snmpManager.SnmpVersion == SnmpVersionEnum.V2
            {
                var reader = new EquipmentReaderV2(snmpManager);
                return reader.GetInterfaceDetail(interfaceId);
            }
        }
    }
}
