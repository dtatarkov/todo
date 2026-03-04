using Core.DTO;

namespace Tests.Unit.Shared.TestData;

public static class ToDoUpdateDtoTestData
{
    public static ToDoUpdateDto GetDefault()
    {
        return new ToDoUpdateDto
        {
            Title = "Updated Title",
            Description = "Updated Description",
            CompletionDatePlanned = DateTimeOffset.Now.AddDays(10)
        };
    }
    
    public static ToDoUpdateDto GetEmpty()
    {
        return new ToDoUpdateDto();
    }
}