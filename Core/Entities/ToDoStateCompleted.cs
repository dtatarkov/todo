using Core.Enums;

namespace Core.Entities;

public class ToDoStateCompleted : IToDoState
{
    private static readonly ToDoStateCompleted instance = new();

    public ToDoStateType Type => ToDoStateType.Completed;

    private ToDoStateCompleted()
    {
    }

    public static ToDoStateCompleted Instance => instance;


    public Task CompleteAsync(IToDo todo)
    {
        return Task.CompletedTask;
    }
}