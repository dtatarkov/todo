using Core.Entities;

namespace Core.Tests.Unit.TestData;

public static class ToDoTestData
{
    public static IToDo GetDefault(Guid? id = null, IToDoOwner? owner = null)
    {
        return new ToDo(owner)
        {
            Id = id ?? Guid.NewGuid(),
            Title = "Default Title",
            Description = "Default Description",
            CompletionDateActual = DateTime.Now.AddDays(1),
        };
    }
    
    public static IToDo GetDefault(IToDoOwner owner)
    {
        return GetDefault(null, owner);
    }
}