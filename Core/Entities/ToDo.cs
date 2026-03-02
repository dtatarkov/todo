using Core.DTO;
using Core.Enums;

namespace Core.Entities;

public class ToDo : IToDo
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

    public IToDo Clone()
    {
        return new ToDo
        {
            Id = Id,
            Title = Title,
            Description = Description,
            CompletionDatePlanned = CompletionDatePlanned,
            CompletionDateActual = CompletionDateActual,
            State = State,
        };
    }
    
    public void UpdateFromData(ToDoUpdateDto data)
    {
        ArgumentNullException.ThrowIfNull(data);

        if (data.Title != null)
        {
            Title = data.Title;
        }

        if (data.Description != null)
        {
            Description = data.Description;
        }

        if (data.CompletionDatePlanned != null)
        {
            CompletionDatePlanned = data.CompletionDatePlanned;
        }
    }

    public ToDoGetDto GetData()
    {
        return new ToDoGetDto
        {
            Id = Id,
            Title = Title,
            Description = Description,
            CompletionDatePlanned = CompletionDatePlanned,
            CompletionDateActual = CompletionDateActual,
            State = State.Type
        };
    }
    
    public static ToDo CreateFromData(ToDoAddDto data)
    {
        ArgumentNullException.ThrowIfNull(data);

        return new ToDo
        {
            Title = data.Title,
            Description = data.Description,
            CompletionDatePlanned = data.CompletionDatePlanned
        };
    }
}