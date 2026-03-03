using Core.DTO;
using Core.Repositories;

namespace Core.Entities;

public class ToDoOwner(IToDoRepository toDoRepository) : IToDoOwner
{
    public async Task SaveAsync(IToDo todo)
    {
        ArgumentNullException.ThrowIfNull(todo);

        if (todo.Owner is not null && todo.Id == Guid.Empty)
        {
            throw new InvalidOperationException("ToDo already has owner");
        }

        await toDoRepository.SaveAsync(todo);
    }

    public async Task<IToDo?> GetToDoByIdAsync(Guid todoId)
    {
        var todo = await toDoRepository.GetByIdAsync(todoId);

        if (todo is not null)
        {
            todo.Owner = this;
        }

        return todo;
    }

    public async Task<IEnumerable<IToDo>> GetAllToDosAsync()
    {
        var todos = await toDoRepository.GetAllAsync();

        var todosWithOwner = todos.Select(todo =>
        {
            todo.Owner = this;

            return todo;
        });

        return todosWithOwner;
    }

    public async Task RemoveToDoAsync(Guid todoId)
    {
        await toDoRepository.RemoveAsync(todoId);
    }
}