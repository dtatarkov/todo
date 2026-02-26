using Core.Enums;

namespace Core.Entities;

public interface IToDoState
{
    ToDoStateType Type { get; }
    
    Task CompleteAsync(IToDo todo);
}