using Core.Enums;

namespace Core.Entities;

public class ToDoStateInitial : IToDoState
{
    private static readonly ToDoStateInitial instance = new();

    public ToDoStateType Type => ToDoStateType.Initial;

    private ToDoStateInitial()
    {
    }

    public static ToDoStateInitial Instance => instance;


    public Task CompleteAsync(IToDo todo)
    {
        todo.CompletionDateActual = DateTimeOffset.Now;
        todo.State = ToDoState.GetState(ToDoStateType.Completed);
        
        return Task.CompletedTask;
    }
}