using Core.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace WebAPI.ExceptionFilters;

public class InvalidOperationExceptionFilter: ExceptionFilterAttribute
{
    public override void OnException(ExceptionContext context)
    {
        if (context.Exception is not InvalidOperationException)
        {
            return;
        }

        context.Result = new BadRequestObjectResult(new
        {
            message = context.Exception.Message
        });
    }
}