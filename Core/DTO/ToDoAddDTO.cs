namespace Core.DTO;

public class ToDoAddDTO
{
    public string Title { get; init; } = string.Empty;
    public string Description { get; init; } = string.Empty;
    public DateTimeOffset? CompletionDatePlanned { get; init; }
}