using Core.Repositories;
using Db.Postgre.Context;
using Db.Postgre.Mappers;
using Db.Postgre.Repositories;
using Microsoft.EntityFrameworkCore;
using WebAPI.ExceptionFilters;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Добавляем контекст PostgreSQL
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("Main"),
        npgsqlOptions => npgsqlOptions.EnableRetryOnFailure()));

// Регистрируем репозиторий
builder.Services.AddScoped<IToDoRepository, PostgreToDoRepository>();
builder.Services.AddScoped<IToDoEntityMapper, ToDoEntityMapper>();

// Регистрируем фильтр исключений глобально
builder.Services.AddControllers(options =>
{
    options.Filters.Add<ArgumentNullExceptionFilter>();
    options.Filters.Add<InvalidOperationExceptionFilter>();
    options.Filters.Add<EntityNotFoundExceptionFilter>();
});

// Регистрируем контроллеры
builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.Run();