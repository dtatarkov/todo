using Core.DTO;

namespace Core.Entities;

public interface IToDo
{
    Guid Id { get; set; }
    string Title { get; set; }
    string Description { get; set; }
    DateTimeOffset? CompletionDatePlanned { get; set; }
    DateTimeOffset? CompletionDateActual { get; set; }
    IToDoState State { get; set; }
    bool IsCompleted { get; }
    
    Task CompleteAsync();
    IToDo Clone();
    Task UpdateFromDataAsync(ToDoUpdateDto data);
    ToDoGetDto GetData();
}