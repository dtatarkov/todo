using Core.DTO;

namespace Core.Tests.Unit.TestData;

public static class ToDoUpdateDtoTestData
{
    public static ToDoUpdateDto GetDefault(Guid? id = null)
    {
        return new ToDoUpdateDto
        {
            Id = id ?? Guid.NewGuid(),
            Title = "Updated Title",
            Description = "Updated Description",
            CompletionDatePlanned = DateTimeOffset.Now.AddDays(10)
        };
    }
}