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

        if (!data.HasData())
        {
            throw new ArgumentException("data is empty", nameof(data));
        }

        var todo = await toDoRepository.GetByIdAsync(data.Id);
        
        if (todo == null)
        {
            throw new InvalidOperationException($"ToDo with Id = {data.Id} not found");
        }

        if (data.Title != null)
        {
            todo.Title = data.Title;
        }

        if (data.Description != null)
        {
            todo.Description = data.Description;
        }

        if (data.CompletionDatePlanned != null)
        {
            todo.CompletionDatePlanned = data.CompletionDatePlanned;
        }

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