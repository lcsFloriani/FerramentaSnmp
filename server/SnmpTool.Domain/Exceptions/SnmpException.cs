namespace SnmpTool.Domain.Exceptions
{
    public class SnmpException : BusinessException
    {
        public SnmpException(string message) : base(ErrorCodes.Unhandled, message)
        {
        }
    }
}
