using Core.DTO;
using Core.Repositories;

namespace Core.Entities;

public class ToDoOwner(IToDoRepository toDoRepository) : IToDoOwner
{
    public async Task<IToDo> AddToDoAsync(ToDoAddDto data)
    {
        ArgumentNullException.ThrowIfNull(data);

        var todo = new ToDo
        {
            Title = data.Title,
            Description = data.Description,
            CompletionDatePlanned = data.CompletionDatePlanned,
        };

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

        var todo = await toDoRepository.GetByIdAsync(data.Id);
        
        if (todo == null)
        {
            throw new InvalidOperationException($"ToDo with Id = {data.Id} not found");
        }

        todo.Title = data.Title;
        todo.Description = data.Description;
        todo.CompletionDatePlanned = data.CompletionDatePlanned;

        await toDoRepository.SaveAsync(todo);
    }

    public async Task RemoveToDoAsync(Guid id)
    {
        var existingTodo = await toDoRepository.GetByIdAsync(id);
        
        if (existingTodo == null)
        {
            throw new InvalidOperationException($"ToDo with Id = {id} not found");
        }

        await toDoRepository.RemoveAsync(existingTodo);
    }
}