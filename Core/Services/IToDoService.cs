using Core.DTO;
using Core.Entities;

namespace Core.Services;

public interface IToDoService
{
    Task<IToDo> AddToDoAsync(ToDoAddDto data);
    Task UpdateToDoAsync(ToDoUpdateDto data);
    Task CompleteToDoAsync(Guid todoId);
}