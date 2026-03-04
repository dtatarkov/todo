using Core.Entities;
using Core.Enums;

namespace Tests.Unit.Shared.TestData;

public static class ToDoTestData
{
    public static IToDo GetEmpty()
    {
        return new ToDo();
    }
    
    public static IToDo GetDefault(Guid? todoId = null, IToDoOwner? owner = null)
    {
        return new ToDo(owner)
        {
            Id = todoId ?? Guid.NewGuid(),
            Title = "Default Title",
            Description = "Default Description",
            CompletionDateActual = DateTime.Now.AddDays(1),
        };
    }
    
    public static IToDo GetDefault(IToDoOwner owner)
    {
        return GetDefault(null, owner);
    }
    
    public static IToDo GetCompleted(Guid? todoId = null, IToDoOwner? owner = null)
    {
        return new ToDo(owner)
        {
            Id = todoId ?? Guid.NewGuid(),
            Title = "Completed Title",
            Description = "Completed Description",
            CompletionDatePlanned = DateTimeOffset.Now.AddDays(-1),
            CompletionDateActual = DateTimeOffset.Now,
            State = ToDoState.GetState(ToDoStateType.Completed)
        };
    }
}