using Core.Entities;

namespace Core.Repositories;

public interface IToDoRepository
{
    Task SaveAsync(IToDo todo);
    Task<IToDo?> GetByIdAsync(Guid todoId);
    Task<ICollection<IToDo>> GetAllAsync();
    Task RemoveAsync(Guid todoId);
}