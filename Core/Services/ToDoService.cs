using Core.DTO;
using Core.Entities;
using Core.Exceptions;
using Core.Factories;

namespace Core.Services;

public class ToDoService(IToDoOwnerFactory toDoOwnerFactory) : IToDoService
{
    public async Task<ToDoGetDto> AddToDoAsync(ToDoAddDto data)
    {
        ArgumentNullException.ThrowIfNull(data);

        var todoOwner = toDoOwnerFactory.Create();
        var todo = ToDo.CreateFromData(data);
        
        await todoOwner.SaveAsync(todo);

        var todoDto = todo.GetData();

        return todoDto;
    }

    public async Task<ToDoGetDto?> GetToDoByIdAsync(Guid todoId)
    {
        var todoOwner = toDoOwnerFactory.Create();
        var todo = await todoOwner.GetToDoByIdAsync(todoId);
        var todoDto = todo?.GetData();

        return todoDto;
    }

    public async Task<IEnumerable<ToDoGetDto>> GetAllToDosAsync()
    {
        var todoOwner = toDoOwnerFactory.Create();
        var todos = await todoOwner.GetAllToDosAsync();
        var todoDtos = todos.Select(t => t.GetData()).ToList();

        return todoDtos;
    }

    public async Task<ToDoGetDto> UpdateToDoAsync(Guid todoId, ToDoUpdateDto data)
    {
        ArgumentNullException.ThrowIfNull(data);

        var todoOwner = toDoOwnerFactory.Create();
        var todo = await todoOwner.GetToDoByIdAsync(todoId);

        EntityNotFoundException.ThrowIfNull(todo, nameof(ToDo), todoId);

        await todo.UpdateFromDataAsync(data);

        return todo.GetData();
    }

    public async Task RemoveToDoAsync(Guid todoId)
    {
        var todoOwner = toDoOwnerFactory.Create();
        await todoOwner.RemoveToDoAsync(todoId);
    }

    public async Task<ToDoGetDto> CompleteToDoAsync(Guid todoId)
    {
        var todoOwner = toDoOwnerFactory.Create();
        var todo = await todoOwner.GetToDoByIdAsync(todoId);

        EntityNotFoundException.ThrowIfNull(todo, nameof(ToDo), todoId);

        await todo.CompleteAsync();

        return todo.GetData();
    }
}