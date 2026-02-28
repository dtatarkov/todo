using Core.Enums;

namespace Core.Entities;

public class ToDo: IToDo
{
    public Guid Id { get; set; } = Guid.Empty;
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTimeOffset? CompletionDatePlanned { get; set; }
    public DateTimeOffset? CompletionDateActual { get; set; }
    public IToDoState State { get; set; } = ToDoState.GetState(ToDoStateType.Initial);
    public bool IsCompleted => State.Type == ToDoStateType.Completed;

    public async Task CompleteAsync()
    {
        await State.CompleteAsync(this);
    }
}