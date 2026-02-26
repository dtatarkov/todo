using Core.DTO;
using Core.Entities;
using Core.Factories;

namespace Core.Services;

public class AddToDoService(IToDoOwnerFactory toDoOwnerFactory) : IAddToDoService
{
    public async Task<IToDo> AddToDoAsync(ToDoAddDTO data)
    {
        var todoOwner = toDoOwnerFactory.Create();
        var todo = await todoOwner.AddToDoAsync(data);

        return todo;
    }
}