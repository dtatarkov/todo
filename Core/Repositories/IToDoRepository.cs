using Core.Entities;

namespace Core.Repositories;

public interface IToDoRepository
{
    Task AddAsync(IToDo todo);
    Task<IToDo?> GetByIdAsync(Guid id);
    Task<IEnumerable<IToDo>> GetAllAsync();
    Task UpdateAsync(IToDo todo);
    Task RemoveAsync(IToDo todo);
}