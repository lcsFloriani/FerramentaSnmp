using Newtonsoft.Json;
using SnmpTool.Domain.Exceptions;
using System;

namespace SnmpTool.API.Exceptions
{
    public class PayLoadException
    {
        [JsonIgnore]
        public Exception Exception { get; set; }
        public int ErrorCode { get; set; }
        public string ErrorMessage { get; set; }

        public static PayLoadException New<T>(T exception) where T : Exception
        {
            int errorCode;
            if (exception is BusinessException)
                errorCode = (exception as BusinessException).ErrorCode.GetHashCode();
            else
                errorCode = ErrorCodes.Unhandled.GetHashCode();
            return new PayLoadException
            {
                ErrorCode = errorCode,
                ErrorMessage = exception.Message,
            };
        }
    }
}
