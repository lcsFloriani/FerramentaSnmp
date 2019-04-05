using SnmpSharpNet;
using SnmpTool.Domain.Equipments;
using SnmpTool.Domain.Snmp;
using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace SnmpTool.Infra.SnmpReader.Equipments
{
    public class EquipmentReaderV2 : IEquipmentReader
    {
        private readonly SnmpManager _snmpManager;
        public EquipmentReaderV2(SnmpManager snmpManager)
        {
            _snmpManager = snmpManager;
        }
        public Equipment GetEquipment()
        {
            var equipment = new Equipment
            {
                Description = GetContentByOId("1.3.6.1.2.1.1.1.0"),
                Contact = GetContentByOId("1.3.6.1.2.1.1.4.0"),
                Location = GetContentByOId("1.3.6.1.2.1.1.6.0"),
                Name = GetContentByOId("1.3.6.1.2.1.1.5.0"),
                UpTime = GetContentByOId("1.3.6.1.2.1.1.3.0"),
                InterfacesCount = Convert.ToInt32(GetContentByOId("1.3.6.1.2.1.2.1.0"))
            };
            try
            {
                equipment.Temperature = Convert.ToDouble(GetContentByOId("1.3.6.1.4.1.25506.2.6.1.1.1.1.12.8"));
            }
            catch
            {
                equipment.Temperature = 0;
            }
            if (equipment.InterfacesCount != 0)
            {
                for (int i = 1; i <= equipment.InterfacesCount; i++)
                    equipment.NetworkInterfaces.Add(GetInterfaceById(i));
            }
            return equipment;
        }
        public InterfaceDetail GetInterfaceDetail(int interfaceId)
        {
            return new InterfaceDetail()
            {
                UtilizationRate = GetUtilizationRate(interfaceId),
                DateTime = DateTime.Now
            };

        }
        public Interface GetInterfaceById(int interfaceId)
        {
            Interface networkInterface = new Interface();
            try
            {
                networkInterface.Index = GetContentByOId($"1.3.6.1.2.1.2.2.1.1.{interfaceId}");
                networkInterface.Description = GetContentByOId($"1.3.6.1.2.1.2.2.1.2.{interfaceId}");
                networkInterface.Type = GetContentByOId($"1.3.6.1.2.1.2.2.1.3.{interfaceId}");
                networkInterface.Speed = Convert.ToDouble(GetContentByOId($"1.3.6.1.2.1.2.2.1.5.{interfaceId}"));
                networkInterface.Mac = GetContentByOId($"1.3.6.1.2.1.2.2.1.6.{interfaceId}");
                networkInterface.AdminStatus = GetContentByOId($"1.3.6.1.2.1.2.2.1.7.{interfaceId}");
                networkInterface.OperationalStatus = GetContentByOId($"1.3.6.1.2.1.2.2.1.8.{interfaceId}");
                
                return networkInterface;
            }
            catch (Exception)
            {
                throw;
            }
        }
        private string GetContentByOId(string oId)
        {
            var contentToReturn = String.Empty;

            OctetString community = new OctetString(_snmpManager.Community);
            AgentParameters param = new AgentParameters(community)
            {
                Version = SnmpVersion.Ver2
            };

            IpAddress agent = new IpAddress(_snmpManager.Ip);

            UdpTarget target = new UdpTarget((IPAddress)agent, _snmpManager.Port, _snmpManager.Timeout, _snmpManager.Retries);

            Pdu pdu = new Pdu(PduType.Get);
            pdu.VbList.Add(oId);

            SnmpV2Packet result = (SnmpV2Packet)target.Request(pdu, param);
            if(result != null)
            {
                if (result.Pdu.ErrorStatus == 0)
                    contentToReturn = result.Pdu.VbList[0].Value.ToString();                
                else
                {
                    // jogar exception aqui depois pq deu merda 
                }
            }
            return contentToReturn;
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

            return rate * 100;
        }      
    }
}
