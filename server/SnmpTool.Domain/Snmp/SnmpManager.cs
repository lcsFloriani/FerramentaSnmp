namespace SnmpTool.Domain.Snmp
{
    public class SnmpManager
    {
        public string Ip { get; private set; }
        public int Port { get; private set; }
        public SnmpVersionEnum SnmpVersion { get; private set; }
        public string Community { get; private set; }
        public int Timeout { get; private set; }
        public int Retries { get; private set; }

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
