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
    
    // Пустой конструктор — для создания без владельца
    public ToDo()
    {
    }

    // Конструктор с указанием владельца
    public ToDo(IToDoOwner? owner) : this()
    {
        Owner = owner;
    }
    
    // Свойство для установки владельца
    public IToDoOwner? Owner { get; set; }

    public async Task CompleteAsync()
    {
        await State.CompleteAsync(this);
    }

    public IToDo Clone()
    {
        return new ToDo(Owner)
        {
            Id = Id,
            Title = Title,
            Description = Description,
            CompletionDatePlanned = CompletionDatePlanned,
            CompletionDateActual = CompletionDateActual,
            State = State,
        };
    }
    
    [Obsolete]
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
    
    public async Task UpdateFromDataAsync(ToDoUpdateDto data)
    {
        ArgumentNullException.ThrowIfNull(data);
        ArgumentNullException.ThrowIfNull(Owner);
        data.ThrowIfEmpty();

        if (data.Title is not null)
        {
            Title = data.Title;
        }

        if (data.Description is not null)
        {
            Description = data.Description;
        }

        if (data.CompletionDatePlanned is not null)
        {
            CompletionDatePlanned = data.CompletionDatePlanned;
        }

        await Owner.SaveAsync(this);
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