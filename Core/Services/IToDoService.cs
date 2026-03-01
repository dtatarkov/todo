using Core.DTO;
using Core.Entities;

namespace Core.Services;

public interface IToDoService
{
    Task<IToDo?> GetToDoByIdAsync(Guid id);
    Task<IEnumerable<IToDo>> GetAllToDosAsync();
    Task<IToDo> AddToDoAsync(ToDoAddDto data);
    Task UpdateToDoAsync(ToDoUpdateDto data);
    Task RemoveToDoAsync(Guid id);
    Task CompleteToDoAsync(Guid todoId);
}