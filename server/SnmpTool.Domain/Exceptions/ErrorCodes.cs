namespace SnmpTool.Domain.Exceptions
{
    public enum ErrorCodes
    {
        BadRequest = 0400,
        Forbidden = 0403,
        NotFound = 0404,
        NotAllowed = 0405,
        AlreadyExists = 0409,
        PreconditionFailed = 0412,
        InvalidObject = 0422,
        Unhandled = 0500,
        ServiceUnavailable = 0503
    }
}
