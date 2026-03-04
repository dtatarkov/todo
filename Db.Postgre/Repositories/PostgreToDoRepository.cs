using Core.Entities;
using Core.Exceptions;
using Core.Repositories;
using Db.Postgre.Context;
using Db.Postgre.Entities;
using Db.Postgre.Mappers;
using Microsoft.EntityFrameworkCore;

namespace Db.Postgre.Repositories;

public class PostgreToDoRepository(AppDbContext dbContext, IPostgreToDoEntityMapper entityMapper) : IToDoRepository
{
    public async Task SaveAsync(IToDo todo)
    {
        ArgumentNullException.ThrowIfNull(todo);

        if (todo.Id == Guid.Empty)
        {
            await AddAsync(todo);
        }
        else
        {
            await UpdateAsync(todo);
        }
    }

    public async Task<IToDo?> GetByIdAsync(Guid todoId)
    {
        if (todoId == Guid.Empty)
        {
            return null;
        }

        var entity = await dbContext.ToDos.FindAsync(todoId);
        
        IToDo? todo = null;

        if (entity != null)
        {
            todo = entityMapper.ToDomainModel(entity);
        }

        return todo;
    }

    public async Task<ICollection<IToDo>> GetAllAsync()
    {
        var entities = await dbContext.ToDos.ToListAsync();
        var todos = entities.Select(entityMapper.ToDomainModel).ToList();
        
        return todos;
    }

    public async Task RemoveAsync(Guid todoId)
    {
        if (todoId == Guid.Empty)
        {
            throw new EntityNotFoundException(nameof(ToDo), todoId);
        }

        var entityExists = await dbContext.ToDos.AnyAsync(todo => todo.Id == todoId);

        if (!entityExists)
        {
            throw new EntityNotFoundException(nameof(ToDo), todoId);
        }

        var entity = dbContext.ToDos.Local.FirstOrDefault(todo => todo.Id == todoId);

        if (entity == null)
        {
            entity = new PostgreToDoEntity()
            {
                Id = todoId
            };
            
            dbContext.ToDos.Attach(entity);
        }

        dbContext.ToDos.Remove(entity);
        await dbContext.SaveChangesAsync();
    }

    private async Task AddAsync(IToDo todo)
    {
        var entity = entityMapper.ToEntity(todo);
        
        await dbContext.ToDos.AddAsync(entity);
        await dbContext.SaveChangesAsync();
        
        todo.Id = entity.Id;
    }

    private async Task UpdateAsync(IToDo todo)
    {
        var entity = await dbContext.ToDos.FindAsync(todo.Id);
        
        EntityNotFoundException.ThrowIfNull(entity, nameof(ToDo), todo.Id);

        entity.Title = todo.Title;
        entity.Description = todo.Description;
        entity.CompletionDatePlanned = todo.CompletionDatePlanned;
        entity.CompletionDateActual = todo.CompletionDateActual;
        entity.StateType = todo.State.Type;

        dbContext.ToDos.Update(entity);
        await dbContext.SaveChangesAsync();
    }
}