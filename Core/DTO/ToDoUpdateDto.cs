namespace Core.DTO;

public class ToDoUpdateDto
{
    public string? Title { get; init; }
    public string? Description { get; init; }
    public DateTimeOffset? CompletionDatePlanned { get; init; }
    
    public bool HasData()
    {
        return Title != null || Description != null || CompletionDatePlanned != null;
    }

    public void ThrowIfEmpty()
    {
        if (!HasData())
        {
            throw new InvalidOperationException("Update data is empty.");
        }
    }
}