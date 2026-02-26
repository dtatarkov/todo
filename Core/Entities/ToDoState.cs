using Core.Enums;

namespace Core.Entities;

public abstract class ToDoState
{
    public static IToDoState GetState(ToDoStateType type)
    {
        return type switch
        {
            ToDoStateType.Initial => ToDoStateInitial.Instance,
            ToDoStateType.Completed => ToDoStateCompleted.Instance,
            _ => throw new ArgumentException("Unknown ToDo state"),
        };
    }
}