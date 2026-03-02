using Core.Entities;

namespace Core.Tests.Unit.TestData;

public static class ToDoTestData
{
    public static IToDo GetDefault(Guid? id = null)
    {
        return new ToDo
        {
            Id = id ?? Guid.NewGuid(),
            Title = "Default Title",
            Description = "Default Description",
            CompletionDateActual = DateTime.Now.AddDays(1),
        };
    }
}