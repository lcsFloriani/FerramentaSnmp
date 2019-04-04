namespace SnmpTool.Domain.Snmp
{
    public class SnmpManager
    {
        public string Ip { get; set; }
        public int Port { get; set; }
        public SnmpVersionEnum SnmpVersion { get; set; }
        public string Community { get; set; }
        public int Timeout { get; set; }
        public int Retries { get; set; }

        public SnmpManager(string ip, int port, SnmpVersionEnum snmpVersion, string community, int timeout, int retries)
        {
            Ip = ip;
            Port = port;
            SnmpVersion = snmpVersion;
            Community = community;
            Timeout = timeout;
            Retries = retries;
        }
    }
}
