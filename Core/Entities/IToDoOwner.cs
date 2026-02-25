using Core.DTO;

namespace Core.Entities;

public interface IToDoOwner
{
    public Task<ToDo> AddToDoAsync(ToDoAddDTO data);
    public Task<ToDo?> GetToDoByIdAsync(Guid id);
    public Task<IEnumerable<ToDo>> GetAllToDosAsync();
}