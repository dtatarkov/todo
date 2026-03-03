using Core.Enums;

namespace Core.DTO;

public class ToDoGetDto
{
    public Guid Id { get; init; } = Guid.Empty;
    public string Title { get; init; } = string.Empty;
    public string Description { get; init; } = string.Empty;
    public DateTimeOffset? CompletionDatePlanned { get; init; }
    public DateTimeOffset? CompletionDateActual { get; init; }
    public ToDoStateType State { get; init; }

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