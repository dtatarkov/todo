using Core.Entities;
using Core.Repositories;

namespace Core.Factories;

public class ToDoOwnerFactory(IToDoRepository toDoRepository) : IToDoOwnerFactory
{
    private readonly IToDoOwner _instance = new ToDoOwner(toDoRepository);

    public IToDoOwner Create()
    {
        return _instance;
    }
}