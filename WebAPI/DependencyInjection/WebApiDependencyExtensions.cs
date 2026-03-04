using Core.Factories;
using Core.Repositories;
using Core.Services;
using Db.Postgre.Context;
using Db.Postgre.Mappers;
using Db.Postgre.Repositories;
using Microsoft.EntityFrameworkCore;
using WebAPI.ExceptionFilters;

namespace WebAPI.DependencyInjection;

public static class WebApiDependencyExtensions
{
    public static void RegisterDbServices(this IServiceCollection services, IConfiguration configuration)
    {
        // Добавляем контекст PostgreSQL
        services.AddDbContext<AppDbContext>(options =>
            options.UseNpgsql(configuration.GetConnectionString("Main"),
                npgsqlOptions => npgsqlOptions.EnableRetryOnFailure()));
        
        // Регистрируем репозиторий
        services.AddScoped<IToDoRepository, PostgreToDoRepository>();
        services.AddScoped<IPostgreToDoEntityMapper, PostgreToDoEntityMapper>();
    }
    
    public static void RegisterApplicationServices(this IServiceCollection services)
    {
        // Регистрируем репозиторий
        services.AddScoped<IToDoService, ToDoService>();
        services.AddScoped<IToDoOwnerFactory, ToDoOwnerFactory>();
    }
    
    public static void RegisterApplicationControllers(this IServiceCollection services)
    {
        // Регистрируем фильтр исключений глобально
        services.AddControllers(options =>
        {
            options.Filters.Add<ArgumentNullExceptionFilter>();
            options.Filters.Add<InvalidOperationExceptionFilter>();
            options.Filters.Add<EntityNotFoundExceptionFilter>();
        });
    }
}