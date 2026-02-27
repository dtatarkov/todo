using Core.Entities;

namespace Core.Repositories;

public interface IToDoRepository
{
    Task AddAsync(IToDo todo);
}