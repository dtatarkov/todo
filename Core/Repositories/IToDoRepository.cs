using Core.Entities;

namespace Core.Repositories;

public interface IToDoRepository
{
    Task SaveAsync(IToDo todo);
    Task<IToDo?> GetByIdAsync(Guid id);
    Task<IEnumerable<IToDo>> GetAllAsync();
    Task RemoveAsync(IToDo todo);
}