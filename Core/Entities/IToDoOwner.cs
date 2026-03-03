using Core.DTO;

namespace Core.Entities;

public interface IToDoOwner
{
    Task SaveAsync(IToDo todo);
    Task<IToDo> AddToDoAsync(ToDoAddDto data);
    Task<IToDo?> GetToDoByIdAsync(Guid id);
    Task<IEnumerable<IToDo>> GetAllToDosAsync();
    Task RemoveToDoAsync(Guid id);
}