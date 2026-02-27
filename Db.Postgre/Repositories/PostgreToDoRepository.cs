using Core.Entities;
using Core.Repositories;
using Db.Postgre.Context;
using Db.Postgre.Mappers;

namespace Db.Postgre.Repositories;

public class PostgreToDoRepository(AppDbContext dbContext, IToDoEntityMapper entityMapper) : IToDoRepository
{
    public async Task AddAsync(IToDo todo)
    {
        if (todo.Id != Guid.Empty)
        {
            throw new InvalidOperationException("Todo can not have defined Id");
        }
        
        var entity = entityMapper.ToEntity(todo);

        await dbContext.ToDos.AddAsync(entity);
        await dbContext.SaveChangesAsync();

        todo.Id = entity.Id;
    }
}