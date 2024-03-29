﻿using System;

namespace SnmpTool.Domain.Exceptions
{
    public class BusinessException : Exception
    {
        public BusinessException(ErrorCodes errorCode, string message) : base(message)
        {
            ErrorCode = errorCode;
        }
        public ErrorCodes ErrorCode { get; }
    }
}
