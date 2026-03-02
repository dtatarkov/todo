using Core.Enums;

namespace Core.DTO;

public class ToDoGetDto
{
    public Guid Id { get; set; } = Guid.Empty;
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTimeOffset? CompletionDatePlanned { get; set; }
    public DateTimeOffset? CompletionDateActual { get; set; }
    public ToDoStateType State { get; set; }

    public bool Equals(ToDoGetDto another)
    {
        return Id == another.Id &&
               Title == another.Title &&
               Description == another.Description &&
               CompletionDatePlanned == another.CompletionDatePlanned &&
               CompletionDateActual == another.CompletionDateActual &&
               State == another.State;
    }
}