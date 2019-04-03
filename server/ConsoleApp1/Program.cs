﻿using SnmpTool.Domain.Snmp;
using SnmpTool.Infra.SnmpReader.Equipments;
using System;

namespace ConsoleApp1
{
    class Program
    {
        static void Main(string[] args)
        {
            var teste = new SnmpManager("172.31.249.179", 161, SnmpVersionEnum.V1, "public", 2, 2);

            var reader = new EquipmentReaderV1(teste);

            var equipment = reader.GetEquipment();
        }
    }
}