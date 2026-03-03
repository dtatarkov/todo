using Core.DTO;
using Core.Exceptions;
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
        return await toDoRepository.GetByIdAsync(id);
    }

    public async Task<IEnumerable<IToDo>> GetAllToDosAsync()
    {
        return await toDoRepository.GetAllAsync();
    }

    public async Task RemoveToDoAsync(Guid id)
    {
        await toDoRepository.RemoveAsync(id);
    }
}