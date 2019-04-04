using AutoMapper;
using AutoMapper.QueryableExtensions;
using FluentValidation.Results;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Extensions;
using Microsoft.AspNet.OData.Query;
using Microsoft.AspNetCore.Mvc;
using SnmpTool.API.Exceptions;
using SnmpTool.Domain.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;

namespace SnmpTool.API.Base
{
    public class ApiControllerBase : ControllerBase
    {
        protected IActionResult HandleCallback<TSuccess>(TSuccess data)
               => Ok(data);

        protected IActionResult HandleQuery<TSource, TResult>(TSource result)
            => Ok(Mapper.Map<TSource, TResult>(result));

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
        protected IActionResult HandleFailure<T>(T exceptionToHandle) where T : Exception
        {
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
