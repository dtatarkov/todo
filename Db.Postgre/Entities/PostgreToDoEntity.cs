using Core.Enums;

namespace Db.Postgre.Entities;

public class PostgreToDoEntity
{
    public Guid Id { get; set; } = Guid.Empty;
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTimeOffset? CompletionDatePlanned { get; set; }
    public DateTimeOffset? CompletionDateActual { get; set; }
    public ToDoStateType StateType { get; set; }
}