using Core.Factories;

namespace Core.Services;

public class CompleteToDoService(IToDoOwnerFactory toDoOwnerFactory) : ICompleteToDoService
{
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