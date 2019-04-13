using SnmpSharpNet;
using SnmpTool.Domain.Equipments;
using SnmpTool.Domain.Results;
using SnmpTool.Domain.Snmp;
using System;
using System.Net;
using System.Threading;

namespace SnmpTool.Infra.SnmpReader.Equipments
{
    public class EquipmentReaderV1 : IEquipmentReader
    {
        private readonly SnmpManager _snmpManager;
        public EquipmentReaderV1(SnmpManager snmpManager)
            => _snmpManager = snmpManager;

        public Result<Exception, Equipment> GetEquipment()
        {
            try
            {
                var equipment = new Equipment
                {
                    Description = GetContentByOId("1.3.6.1.2.1.1.1.0"),
                    Contact = GetContentByOId("1.3.6.1.2.1.1.4.0"),
                    Location = GetContentByOId("1.3.6.1.2.1.1.6.0"),
                    Name = GetContentByOId("1.3.6.1.2.1.1.5.0"),
                    UpTime = GetContentByOId("1.3.6.1.2.1.1.3.0"),
                };

                equipment.Memory = TryGetMemoryUsage();
                equipment.Cpu = TryGetCpuUsage();
                try
                {
                    equipment.InterfacesCount = Convert.ToInt32(GetContentByOId("1.3.6.1.2.1.2.1.0"));
                }
                catch
                {
                    equipment.InterfacesCount = -1;
                }
                if (equipment.InterfacesCount > 0)
                {
                    for (int i = 1; i <= equipment.InterfacesCount; i++)
                        equipment.NetworkInterfaces.Add(GetInternalInterfaceById(i));
                }
                if (equipment.InterfacesCount == -1)
                {
                    bool noerrors = true;
                    int index = 1;
                    while (noerrors)
                    {
                        try
                        {
                            equipment.NetworkInterfaces.Add(GetInternalInterfaceById(index));
                            index++;
                        }
                        catch
                        {
                            noerrors = false;
                        }

                    }
                }
                return equipment;

            }
            catch
            {
                return new Exception("Falha ao capturar equipamento");
            }
        }

        public Result<Exception, InterfaceDetail> GetInterfaceDetail(int interfaceId)
        {
            try
            {
                return new InterfaceDetail()
                {
                    UtilizationRate = GetUtilizationRate(interfaceId),
                    DiscardIn = GetDiscardIn(interfaceId),
                    DiscardOut = GetDiscardOut(interfaceId),
                    ErrorIn = GetInErrors(interfaceId),
                    ErrorOut = GetOutErrors(interfaceId)
                };
            }
            catch
            {
                return new Exception("Erro ao capturar detalhes da interface");
            }

        }

        public Result<Exception, Interface> GetInterfaceById(int interfaceId)
        {
            try
            {
                return new Interface()
                {
                    Index = GetContentByOId($"1.3.6.1.2.1.2.2.1.1.{interfaceId}"),
                    Description = GetContentByOId($"1.3.6.1.2.1.2.2.1.2.{interfaceId}"),
                    Type = GetContentByOId($"1.3.6.1.2.1.2.2.1.3.{interfaceId}"),
                    Speed = Convert.ToDouble(GetContentByOId($"1.3.6.1.2.1.2.2.1.5.{interfaceId}")),
                    Mac = GetContentByOId($"1.3.6.1.2.1.2.2.1.6.{interfaceId}"),
                    AdminStatus = GetContentByOId($"1.3.6.1.2.1.2.2.1.7.{interfaceId}"),
                    OperationalStatus = GetContentByOId($"1.3.6.1.2.1.2.2.1.8.{interfaceId}")
                };
            }
            catch
            {
                return new Exception("Erro ao capturar informações da interface");
            }
        }
        private double TryGetMemoryUsage()
        {
            double memory = 0;
            try
            {
                // Tenta capturar direto nos oId do Switch HP
                memory = Convert.ToDouble(GetContentByOId("1.3.6.1.4.1.25506.2.6.1.1.1.1.8.8"));
            }
            catch { memory = 0; }

            if (memory == 0)
            {
                try { memory = GetMemoryInUseLinux(); }
                catch { memory = 0; }
            }
            return memory;
        }
        private Interface GetInternalInterfaceById(int interfaceId)
        {
            return new Interface()
            {
                Index = GetContentByOId($"1.3.6.1.2.1.2.2.1.1.{interfaceId}"),
                Description = GetContentByOId($"1.3.6.1.2.1.2.2.1.2.{interfaceId}"),
                Type = GetContentByOId($"1.3.6.1.2.1.2.2.1.3.{interfaceId}"),
                Speed = Convert.ToDouble(GetContentByOId($"1.3.6.1.2.1.2.2.1.5.{interfaceId}")),
                Mac = GetContentByOId($"1.3.6.1.2.1.2.2.1.6.{interfaceId}"),
                AdminStatus = GetContentByOId($"1.3.6.1.2.1.2.2.1.7.{interfaceId}"),
                OperationalStatus = GetContentByOId($"1.3.6.1.2.1.2.2.1.8.{interfaceId}")
            };
        }
        private double TryGetCpuUsage()
        {
            double cpu = 0;
            try
            {
                // Tenta capturar direto nos oId do Switch HP
                cpu = Convert.ToDouble(GetContentByOId("1.3.6.1.4.1.25506.2.6.1.1.1.1.6.8"));
            }
            catch { cpu = 0; }
            return cpu;
        }
        private string GetContentByOId(string oId)
        {
            var contentToReturn = String.Empty;

            OctetString community = new OctetString(_snmpManager.Community);
            AgentParameters param = new AgentParameters(community) { Version = SnmpVersion.Ver1 };
            IpAddress agent = new IpAddress(_snmpManager.Ip);
            UdpTarget target = new UdpTarget((IPAddress)agent, _snmpManager.Port, _snmpManager.Timeout, _snmpManager.Retries);
            Pdu pdu = new Pdu(PduType.Get);
            pdu.VbList.Add(oId);
            try
            {
                SnmpV1Packet result = (SnmpV1Packet)target.Request(pdu, param);
                int errorIndex;
                if (result != null)
                {
                    if (result.Pdu.ErrorStatus == 0)
                        contentToReturn = result.Pdu.VbList[0].Value.ToString();
                    else
                        errorIndex = result.Pdu.ErrorIndex;
                    return contentToReturn;
                }
                else
                    return "Falha na leitura";
            }
            catch (Exception ex) { throw new SnmpException($"Erro na captura do {oId}, {ex.Message}"); }
        }

        private double GetUtilizationRate(int interfaceId)
        {
            var timer = 1000;

            double speed = Convert.ToDouble(GetContentByOId($"1.3.6.1.2.1.2.2.1.5.{interfaceId}"));

            double InOctetsStart = Convert.ToDouble(GetContentByOId($"1.3.6.1.2.1.2.2.1.10.{interfaceId}"));

            double OutOctetsStart = Convert.ToDouble(GetContentByOId($"1.3.6.1.2.1.2.2.1.16.{interfaceId}"));

            Thread.Sleep(timer);

            double InOctetsEnd = Convert.ToDouble(GetContentByOId($"1.3.6.1.2.1.2.2.1.10.{interfaceId}"));

            double OutOctetsEnd = Convert.ToDouble(GetContentByOId($"1.3.6.1.2.1.2.2.1.16.{interfaceId}"));

            while (InOctetsStart == InOctetsEnd)
            {
                Thread.Sleep(timer);
                InOctetsEnd = Convert.ToDouble(GetContentByOId($"1.3.6.1.2.1.2.2.1.10.{interfaceId}"));
            }

            while (OutOctetsStart == OutOctetsEnd)
            {
                Thread.Sleep(timer);
                OutOctetsEnd = Convert.ToDouble(GetContentByOId($"1.3.6.1.2.1.2.2.1.16.{interfaceId}"));
            }


            double rate = (((InOctetsEnd - InOctetsStart) + (OutOctetsEnd - OutOctetsStart)) / (timer * speed)) * (8 * 100);

            return Math.Round(rate * 100, 2);
        }

        private double GetInErrors(int interfaceId)
            => Math.Round(Convert.ToDouble(GetContentByOId($"1.3.6.1.2.1.2.2.1.14.{interfaceId}")) /
            (Convert.ToDouble(GetContentByOId($"1.3.6.1.2.1.2.2.1.11.{interfaceId}")) + Convert.ToDouble(GetContentByOId($"1.3.6.1.2.1.2.2.1.12.{interfaceId}"))), 2);

        private double GetOutErrors(int interfaceId)
            => Math.Round(Convert.ToDouble(GetContentByOId($"1.3.6.1.2.1.2.2.1.20.{interfaceId}")) /
                (Convert.ToDouble(GetContentByOId($"1.3.6.1.2.1.2.2.1.17.{interfaceId}")) + Convert.ToDouble(GetContentByOId($"1.3.6.1.2.1.2.2.1.18.{interfaceId}"))), 2);

        private double GetDiscardIn(int interfaceId)
            => Math.Round(Convert.ToDouble(GetContentByOId($"1.3.6.1.2.1.2.2.1.13.{interfaceId}")) /
                (Convert.ToDouble(GetContentByOId($"1.3.6.1.2.1.2.2.1.11.{interfaceId}")) + Convert.ToDouble(GetContentByOId($"1.3.6.1.2.1.2.2.1.12.{interfaceId}"))), 2);

        private double GetDiscardOut(int interfaceId)
            => Math.Round(Convert.ToDouble(GetContentByOId($"1.3.6.1.2.1.2.2.1.19.{interfaceId}")) /
                (Convert.ToDouble(GetContentByOId($"1.3.6.1.2.1.2.2.1.17.{interfaceId}")) + Convert.ToDouble(GetContentByOId($"1.3.6.1.2.1.2.2.1.18.{interfaceId}"))), 2);
        private double GetMemoryInUseLinux()
           => Math.Round((((Convert.ToDouble(GetContentByOId("1.3.6.1.4.1.2021.4.5.0")) - Convert.ToDouble(GetContentByOId("1.3.6.1.4.1.2021.4.6.0"))) - Convert.ToDouble(GetContentByOId("1.3.6.1.4.1.2021.4.14.0")) - Convert.ToDouble(GetContentByOId("1.3.6.1.4.1.2021.4.15.0"))
               / Convert.ToDouble(GetContentByOId("1.3.6.1.4.1.2021.4.5.0"))) * 100));
    }
}