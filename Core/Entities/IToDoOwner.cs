namespace Core.Entities;

public interface IToDoOwner
{
    public Task<ToDo> AddToDoAsync(string title, string description);
    public Task<ToDo?> GetToDoByIdAsync(Guid id);
    public Task<IEnumerable<ToDo>> GetAllToDosAsync();
}