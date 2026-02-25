using Core.Entities;

namespace Core.Factories;

public class ToDoOwnerFactory : IToDoOwnerFactory
{
    private readonly IToDoOwner _instance = new ToDoOwner();

    public IToDoOwner Create()
    {
        return _instance;
    }
}