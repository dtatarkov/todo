using Core.DTO;
using Core.Exceptions;
using Core.Repositories;

namespace Core.Entities;

public class ToDoOwner(IToDoRepository toDoRepository) : IToDoOwner
{
    public async Task<IToDo> AddToDoAsync(ToDoAddDto data)
    {
        ArgumentNullException.ThrowIfNull(data);

        var todo = CreateTodoFromDto(data);

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

        UpdateTodoFromDto(todo, data);

        await toDoRepository.SaveAsync(todo);
    }

    public async Task RemoveToDoAsync(Guid id)
    {
        await toDoRepository.RemoveAsync(id);
    }
    
    private static ToDo CreateTodoFromDto(ToDoAddDto data)
    {
        return new ToDo
        {
            Title = data.Title,
            Description = data.Description,
            CompletionDatePlanned = data.CompletionDatePlanned
        };
    }

    private static void UpdateTodoFromDto(IToDo todo, ToDoUpdateDto data)
    {
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
    }
}