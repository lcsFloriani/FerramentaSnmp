namespace SnmpTool.Domain.Equipments
{
    //(índice, descrição, tipo, velocidade, mac, status administrativo e operacional
    public class Interface
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public double Speed { get; set; }
        public string Mac { get; set; }
        public string AdminStatus { get; set; }
        public string OperationalStatus { get; set; }
    }
}
