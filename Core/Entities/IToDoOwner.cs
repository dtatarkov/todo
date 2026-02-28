using Core.DTO;

namespace Core.Entities;

public interface IToDoOwner
{
    public Task<IToDo> AddToDoAsync(ToDoAddDto data);
    public Task<IToDo?> GetToDoByIdAsync(Guid id);
    public Task<IEnumerable<IToDo>> GetAllToDosAsync();
}