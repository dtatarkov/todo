using Core.Entities;
using Db.Postgre.Entities;

namespace Db.Postgre.Mappers;

public class PostgreToDoEntityMapper : IPostgreToDoEntityMapper
{
    public IToDo ToDomainModel(PostgreToDoEntity entity)
    {
        ArgumentNullException.ThrowIfNull(entity);

        return new ToDo
        {
            Id = entity.Id,
            Title = entity.Title,
            Description = entity.Description,
            CompletionDatePlanned = entity.CompletionDatePlanned,
            CompletionDateActual = entity.CompletionDateActual,
            State = ToDoState.GetState(entity.StateType)
        };
    }

    public PostgreToDoEntity ToEntity(IToDo todo)
    {
        ArgumentNullException.ThrowIfNull(todo);

        return new PostgreToDoEntity
        {
            Id = todo.Id,
            Title = todo.Title,
            Description = todo.Description,
            CompletionDatePlanned = todo.CompletionDatePlanned?.ToUniversalTime(),
            CompletionDateActual = todo.CompletionDateActual?.ToUniversalTime(),
            StateType = todo.State.Type
        };
    }
}