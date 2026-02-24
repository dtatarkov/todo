namespace Core.Entities;

public class ToDoOwner
{
    private Dictionary<Guid, ToDo> todos = new();
    
    public ToDo AddToDo(string title, string description)
    {
        var todo = new ToDo()
        {
            Title = title,
            Description = description
        };
        
        todos.Add(todo.Id, todo);

        return todo;
    }

    public ToDo? GetToDoById(Guid id)
    {
        ToDo? todo;
        todos.TryGetValue(id, out todo);

        return todo;
    }
}