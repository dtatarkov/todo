using Core.DTO;
using Core.Entities;

namespace Core.Services;

public interface IAddToDoService
{
    public Task<IToDo> AddToDoAsync(ToDoAddDTO data);
}