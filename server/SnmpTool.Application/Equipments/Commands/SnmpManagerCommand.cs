using FluentValidation;
using FluentValidation.Results;
using SnmpTool.Domain.Snmp;

namespace SnmpTool.Application.Equipments.Commands
{
    public class SnmpManagerCommand
    {
        public string Ip { get; set; }
        public int Port { get; set; }
        public SnmpVersionEnum SnmpVersion { get; set; }
        public string Community { get; set; }
        public int Timeout { get; set; }
        public int Retries { get; set; }
        public ValidationResult Validate() => new Validator().Validate(this);
    }
    class Validator : AbstractValidator<SnmpManagerCommand>
    {
        private readonly int _greaterThan = 0;
        public Validator()
        {
            RuleFor(s => s.Ip).NotNull().WithMessage("ip cant be null").NotEmpty().WithMessage("ip cant be empty");
            RuleFor(s => s.Port).NotNull().WithMessage("port cant be null").GreaterThan(_greaterThan).WithMessage("port cannot be below 0");
            RuleFor(s => s.Community).NotNull().WithMessage("community cant be null").NotEmpty().WithMessage("community cant be empty");
        }
    }
}
