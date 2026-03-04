using Core.DTO;

namespace Tests.Unit.Shared.TestData;

public static class ToDoAddDtoTestData
{
    public static ToDoAddDto GetDefault()
    {
        return new ToDoAddDto
        {
            Title = "New Task",
            Description = "Description",
            CompletionDatePlanned = DateTimeOffset.Now.AddDays(1)
        };
    }
}