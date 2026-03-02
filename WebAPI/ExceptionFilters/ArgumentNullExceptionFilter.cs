using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace WebAPI.ExceptionFilters;

public class ArgumentNullExceptionFilter : ExceptionFilterAttribute 
{
    public override void OnException(ExceptionContext context)
    {
        if (context.Exception is not ArgumentNullException)
        {
            return;
        }

        context.Result = new BadRequestObjectResult(new
        {
            message = context.Exception.Message
        });
    }
}