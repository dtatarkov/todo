using Core.Entities;
using Core.Repositories;
using Db.Postgre.Context;
using Db.Postgre.Mappers;
using Microsoft.EntityFrameworkCore;

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

    public async Task<IToDo?> GetByIdAsync(Guid id)
    {
        if (id == Guid.Empty)
        {
            return null;
        }

        var entity = await dbContext.ToDos.FindAsync(id);
        
        IToDo? todo = null;

        if (entity != null)
        {
            todo = entityMapper.ToDomainModel(entity);
        }

        return todo;
    }

    public async Task<IEnumerable<IToDo>> GetAllAsync()
    {
        var entities = await dbContext.ToDos.ToListAsync();
        var todos = entities.Select(entityMapper.ToDomainModel).ToList();

        return todos;
    }

    public async Task UpdateAsync(IToDo todo)
    {
        ArgumentNullException.ThrowIfNull(todo);

        var entity = await dbContext.ToDos.FindAsync(todo.Id);
        
        if (entity == null)
        {
            throw new InvalidOperationException($"Todo with Id = {todo.Id} does not exist");
        }

        // Обновляем поля сущности
        entity.Title = todo.Title;
        entity.Description = todo.Description;
        entity.CompletionDatePlanned = todo.CompletionDatePlanned;
        entity.CompletionDateActual = todo.CompletionDateActual;
        entity.StateType = todo.State.Type;

        dbContext.ToDos.Update(entity);
        await dbContext.SaveChangesAsync();
    }

    public async Task RemoveAsync(IToDo todo)
    {
        if (todo.Id == Guid.Empty)
        {
            throw new InvalidOperationException($"Todo with Id = {todo.Id} does not exist");
        }

        var entity = await dbContext.ToDos.FindAsync(todo.Id);

        if (entity == null)
        {
            throw new InvalidOperationException($"Todo with Id = {todo.Id} does not exist");
        }
        
        dbContext.ToDos.Remove(entity);
        await dbContext.SaveChangesAsync();
    }
}