using Core.DTO;

namespace Core.Entities;

public interface IToDoOwner
{
    Task SaveAsync(IToDo todo);
    Task<IToDo?> GetToDoByIdAsync(Guid todoId);
    Task<IEnumerable<IToDo>> GetAllToDosAsync();
    Task RemoveToDoAsync(Guid todoId);
}