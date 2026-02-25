namespace Core.Entities;

public class ToDoOwner : IToDoOwner
{
    private Dictionary<Guid, ToDo> todos = new();

    public async Task<ToDo> AddToDoAsync(string title, string description)
    {
        var todo = new ToDo
        {
            Title = title,
            Description = description,
        };

        todos.Add(todo.Id, todo);

        return todo;
    }

    public async Task<ToDo?> GetToDoByIdAsync(Guid id)
    {
        todos.TryGetValue(id, out var todo);

        return todo;
    }

    public async Task<IEnumerable<ToDo>> GetAllToDosAsync()
    {
        return todos.Values;
    }
}