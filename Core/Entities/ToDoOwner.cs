namespace Core.Entities;

public class ToDoOwner
{
    private Dictionary<Guid, ToDo> todos = new();
    
    public Task<ToDo> AddToDoAsync(string title, string description)
    {
        var todo = new ToDo()
        {
            Title = title,
            Description = description
        };
        
        todos.Add(todo.Id, todo);

        return Task.FromResult(todo);
    }

    public Task<ToDo?> GetToDoByIdAsync(Guid id)
    {
        ToDo? todo;
        todos.TryGetValue(id, out todo);

        return Task.FromResult(todo);
    }
}