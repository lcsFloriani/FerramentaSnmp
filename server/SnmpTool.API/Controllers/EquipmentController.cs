using FluentValidation.Results;
using Microsoft.AspNetCore.Mvc;
using SnmpTool.API.Base;
using SnmpTool.Application.Equipments;
using SnmpTool.Application.Equipments.Commands;
using SnmpTool.Application.Equipments.Queries;
using SnmpTool.Domain.Equipments;

namespace SnmpTool.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EquipmentController : ApiControllerBase
    {
        private readonly IEquipmentService _equipmentService;

        public EquipmentController(IEquipmentService equipmentService)
        {
            _equipmentService = equipmentService;
        }
        [HttpPost]
        public IActionResult GetEquipment([FromBody]SnmpManagerCommand cmd)
        {
            ValidationResult validationResult = cmd.Validate();

            if (!validationResult.IsValid)
                return HandleValidationFailure(validationResult.Errors);

            return HandleQuery<EquipmentFullQuery, Equipment>(_equipmentService.GetFullEquipment(cmd));
        }
        [HttpPost]
        [Route("{id:int}")]
        public IActionResult GetInterfaceDetails(int id, [FromBody]SnmpManagerCommand cmd)
        {
            ValidationResult validationResult = cmd.Validate();

            if (!validationResult.IsValid)
                return HandleValidationFailure(validationResult.Errors);

            return HandleCallback<InterfaceDetail>(_equipmentService.GetInterfaceById(cmd, id));
        }
    }
}