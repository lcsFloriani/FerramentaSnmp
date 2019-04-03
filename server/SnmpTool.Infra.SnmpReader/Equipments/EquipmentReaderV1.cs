using SnmpSharpNet;
using SnmpTool.Domain.Equipments;
using SnmpTool.Domain.Snmp;
using System;
using System.Net;

namespace SnmpTool.Infra.SnmpReader.Equipments
{
    public class EquipmentReaderV1 : IEquipmentReader
    {
        private readonly SnmpManager _snmpManager;
        public EquipmentReaderV1(SnmpManager snmpManager)
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
                InterfacesCount = Convert.ToInt32(GetContentByOId("1.3.6.1.2.1.2.1.0")),
                Temperature = Convert.ToDouble(GetContentByOId(""))
            };
            return equipment;
        }        

        private string GetContentByOId(string oId)
        {
            var contentToReturn = String.Empty;

            OctetString community = new OctetString(_snmpManager.Community);
            AgentParameters param = new AgentParameters(community)
            {
                Version = SnmpVersion.Ver1
            };

            IpAddress agent = new IpAddress(_snmpManager.Ip);

            UdpTarget target = new UdpTarget((IPAddress)agent, _snmpManager.Port, _snmpManager.Timeout, _snmpManager.Retries);

            Pdu pdu = new Pdu(PduType.Get);
            pdu.VbList.Add(oId);

            SnmpV1Packet result = (SnmpV1Packet)target.Request(pdu, param);
            if(result != null)
            {
                if (result.Pdu.ErrorStatus == 0)
                    contentToReturn = result.Pdu.VbList[0].Oid.ToString();                
                else
                {
                    // jogar exception aqui depois pq deu merda 
                }
            }
                
            result.Pdu.VbList[0].Oid.ToString();
            return contentToReturn;
        }

    }
}
