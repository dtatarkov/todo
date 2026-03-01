using Core.DTO;
using Core.Entities;

namespace Core.Services;

public interface IToDoService
{
    Task<IToDo> AddToDoAsync(ToDoAddDto data);
    Task CompleteToDoAsync(Guid todoId);
}