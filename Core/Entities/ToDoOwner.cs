using Core.DTO;
using Core.Exceptions;
using Core.Repositories;

namespace Core.Entities;

public class ToDoOwner(IToDoRepository toDoRepository) : IToDoOwner
{
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
    
    public async Task UpdateToDoAsync(ToDoUpdateDto data)
    {
        ArgumentNullException.ThrowIfNull(data);

        if (!data.HasData())
        {
            throw new ArgumentException("data is empty", nameof(data));
        }

        var todo = await toDoRepository.GetByIdAsync(data.Id);
        
        if (todo == null)
        {
            throw new EntityNotFoundException(nameof(ToDo), data.Id);
        }

        todo.UpdateFromData(data);

        await toDoRepository.SaveAsync(todo);
    }

    public async Task RemoveToDoAsync(Guid id)
    {
        await toDoRepository.RemoveAsync(id);
    }
}