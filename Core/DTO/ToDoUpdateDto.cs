namespace Core.DTO;

public class ToDoUpdateDto
{
    public Guid Id { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public DateTimeOffset? CompletionDatePlanned { get; set; }
    
    public bool HasData()
    {
        return Title != null || Description != null || CompletionDatePlanned != null;
    }
}