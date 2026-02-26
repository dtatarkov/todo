using Core.DTO;

namespace Core.Entities;

public class ToDoOwner : IToDoOwner
{
    private Dictionary<Guid, IToDo> todos = new();

    public async Task<IToDo> AddToDoAsync(ToDoAddDTO data)
    {
        ArgumentNullException.ThrowIfNull(data);

        var todo = new ToDo
        {
            Title = data.Title,
            Description = data.Description,
            CompletionDatePlanned = data.CompletionDatePlanned,
        };

        todos.Add(todo.Id, todo);

        return todo;
    }

    public async Task<IToDo?> GetToDoByIdAsync(Guid id)
    {
        if (id == Guid.Empty)
        {
            return null;
        }

        todos.TryGetValue(id, out var todo);

        return todo;
    }

    public async Task<IEnumerable<IToDo>> GetAllToDosAsync()
    {
        return todos.Values;
    }
}