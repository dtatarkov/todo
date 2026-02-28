using Core.DTO;

namespace Core.Entities;

public interface IToDoOwner
{
    Task<IToDo> AddToDoAsync(ToDoAddDto data);
    Task<IToDo?> GetToDoByIdAsync(Guid id);
    Task<IEnumerable<IToDo>> GetAllToDosAsync();
    Task UpdateToDoAsync(ToDoUpdateDto data);
    Task RemoveToDoAsync(Guid id);
}