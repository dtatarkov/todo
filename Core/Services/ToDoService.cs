using Core.DTO;
using Core.Entities;
using Core.Factories;

namespace Core.Services;

public class ToDoService(IToDoOwnerFactory toDoOwnerFactory) : IToDoService
{
    public async Task<IToDo?> GetToDoByIdAsync(Guid id)
    {
        var todoOwner = toDoOwnerFactory.Create();
        var todo = await todoOwner.GetToDoByIdAsync(id);

        return todo;
    }
    
    public async Task<IEnumerable<IToDo>> GetAllToDosAsync()
    {
        var todoOwner = toDoOwnerFactory.Create();
        var todos = await todoOwner.GetAllToDosAsync();

        return todos;
    }
    
    public async Task<IToDo> AddToDoAsync(ToDoAddDto data)
    {
        ArgumentNullException.ThrowIfNull(data);
        
        var todoOwner = toDoOwnerFactory.Create();
        var todo = await todoOwner.AddToDoAsync(data);

        return todo;
    }
    
    public async Task UpdateToDoAsync(ToDoUpdateDto data)
    {
        ArgumentNullException.ThrowIfNull(data);

        var todoOwner = toDoOwnerFactory.Create();
        await todoOwner.UpdateToDoAsync(data);
    }
    
    public async Task RemoveToDoAsync(Guid id)
    {
        var todoOwner = toDoOwnerFactory.Create();
        await todoOwner.RemoveToDoAsync(id);
    }

    public async Task CompleteToDoAsync(Guid todoId)
    {
        if (todoId == Guid.Empty)
        {
            throw new ArgumentException("Invalid todo ID.", nameof(todoId));
        }

        var todoOwner = toDoOwnerFactory.Create();
        var todo = await todoOwner.GetToDoByIdAsync(todoId);

        if (todo == null)
        {
            throw new ArgumentException($"ToDo with ID {todoId} not found.");
        }

        await todo.CompleteAsync();
    }
}