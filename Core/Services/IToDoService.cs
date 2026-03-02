using Core.DTO;

namespace Core.Services;

public interface IToDoService
{
    Task<ToDoGetDto?> GetToDoByIdAsync(Guid id);
    Task<IEnumerable<ToDoGetDto>> GetAllToDosAsync();
    Task<ToDoGetDto> AddToDoAsync(ToDoAddDto data);
    Task UpdateToDoAsync(ToDoUpdateDto data);
    Task RemoveToDoAsync(Guid id);
    Task CompleteToDoAsync(Guid todoId);
}