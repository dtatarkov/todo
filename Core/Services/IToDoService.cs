using Core.DTO;

namespace Core.Services;

public interface IToDoService
{
    Task<ToDoGetDto?> GetToDoByIdAsync(Guid todoId);
    Task<IEnumerable<ToDoGetDto>> GetAllToDosAsync();
    Task<ToDoGetDto> AddToDoAsync(ToDoAddDto data);
    Task<ToDoGetDto> UpdateToDoAsync(Guid todoId, ToDoUpdateDto data);
    Task RemoveToDoAsync(Guid todoId);
    Task CompleteToDoAsync(Guid todoId);
}