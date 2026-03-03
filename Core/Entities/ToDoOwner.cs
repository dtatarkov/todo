using Core.DTO;
using Core.Repositories;

namespace Core.Entities;

public class ToDoOwner(IToDoRepository toDoRepository) : IToDoOwner
{
    public async Task SaveAsync(IToDo todo)
    {
        ArgumentNullException.ThrowIfNull(todo);

        await toDoRepository.SaveAsync(todo);
    }

    public async Task<IToDo> AddToDoAsync(ToDoAddDto data)
    {
        ArgumentNullException.ThrowIfNull(data);

        var todo = ToDo.CreateFromData(data);

        await toDoRepository.SaveAsync(todo);

        return todo;
    }

    public async Task<IToDo?> GetToDoByIdAsync(Guid id)
    {
        var todo = await toDoRepository.GetByIdAsync(id);

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

    public async Task RemoveToDoAsync(Guid id)
    {
        await toDoRepository.RemoveAsync(id);
    }
}