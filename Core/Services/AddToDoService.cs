using Core.DTO;
using Core.Entities;

namespace Core.Services;

public class AddToDoService: IAddToDoService
{
    public async Task<ToDo> AddToDoAsync(ToDoAddDTO data)
    {
        var todoOwner = new ToDoOwner();
        var todo = await todoOwner.AddToDoAsync(data);

        return todo;
    }
}