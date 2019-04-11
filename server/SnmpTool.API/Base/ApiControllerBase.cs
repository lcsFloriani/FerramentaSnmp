using AutoMapper;
using AutoMapper.QueryableExtensions;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Extensions;
using Microsoft.AspNet.OData.Query;
using Microsoft.AspNetCore.Mvc;
using SnmpTool.API.Exceptions;
using SnmpTool.Domain.Exceptions;
using SnmpTool.Domain.Results;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;

namespace SnmpTool.API.Base
{
    public class ApiControllerBase : ControllerBase
    {
        public IActionResult HandleCommand<TFailure, TSuccess>(Result<TFailure, TSuccess> callback) where TFailure : Exception
        {
            return callback.IsFailure ? HandleFailure(callback.Failure) : Ok(callback.Success);
        }
        public IActionResult HandleCallback<TFailure, TSuccess>(Result<TFailure, TSuccess> callback) where TFailure : Exception
        {
            return callback.IsFailure ? HandleFailure(callback.Failure) : Ok(callback.Success);
        }
        public IActionResult HandleQuery<TSource, TResult>(Result<Exception, TSource> callback)
        {
            return callback.IsFailure ? HandleFailure(callback.Failure) : Ok(Mapper.Map<TSource, TResult>(callback.Success));
        }
        protected IActionResult HandleQueryable<TQueryOptions, TResult>(IQueryable<TQueryOptions> query, ODataQueryOptions<TQueryOptions> queryOptions)
        {
            return Ok(HandlePageResult<TQueryOptions, TResult>(query, queryOptions));
        }
        protected IActionResult HandleQueryable<TQueryOptions, TResult>(IQueryable<TQueryOptions> query)
        {
            return Ok(query);
        }

        protected PageResult<RetType> HandlePageResult<OriginType, RetType>(IQueryable<OriginType> query, ODataQueryOptions<OriginType> queryOptions)
        {
            var queryResults = queryOptions.ApplyTo(query).Cast<OriginType>().ToList().AsQueryable();
            var pageResult = new PageResult<RetType>(queryResults.ProjectTo<RetType>(),
                Request.ODataFeature().NextLink,
                Request.ODataFeature().TotalCount);

            return pageResult;
        }
        public IActionResult HandleFailure<T>(T exceptionToHandle) where T : Exception
        {
            if (exceptionToHandle is ValidationException)
                return StatusCode(HttpStatusCode.BadRequest.GetHashCode(), (exceptionToHandle as ValidationException).Errors);

            var exceptionPayload = PayLoadException.New(exceptionToHandle);

            return exceptionToHandle is BusinessException ?
                StatusCode(HttpStatusCode.BadRequest.GetHashCode(), exceptionPayload) :
                StatusCode(HttpStatusCode.InternalServerError.GetHashCode(), exceptionPayload);
        }

        protected IActionResult HandleValidationFailure<T>(IList<T> validationFailure) where T : ValidationFailure
        {
            return StatusCode(HttpStatusCode.BadRequest.GetHashCode(), validationFailure);
        }
    }
}
