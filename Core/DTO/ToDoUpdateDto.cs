namespace Core.DTO;

public class ToDoUpdateDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTimeOffset? CompletionDatePlanned { get; set; }
}