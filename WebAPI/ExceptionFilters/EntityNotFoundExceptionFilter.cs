using Core.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace WebAPI.ExceptionFilters;

public class EntityNotFoundExceptionFilter: ExceptionFilterAttribute
{
    public override void OnException(ExceptionContext context)
    {
        if (context.Exception is not EntityNotFoundException)
        {
            return;
        }

        context.Result = new NotFoundObjectResult(new
        {
            message = context.Exception.Message
        });
    }
}