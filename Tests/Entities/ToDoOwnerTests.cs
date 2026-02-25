using Core.DTO;
using Core.Factories;

namespace Tests.Entities;

public class ToDoOwnerTests
{
    [Fact]
    public async Task AddToDoReturnsToDoIfDataIsValid()
    {
        var todoOwnerFactory = new ToDoOwnerFactory();
        var todoOwner = todoOwnerFactory.Create();
        
        var todoAddDto = new ToDoAddDTO
        {
            Title = "Title",
            Description = "Test",
            CompletionDatePlanned = DateTimeOffset.Now,
        };

        var todo = await todoOwner.AddToDoAsync(todoAddDto);

        Assert.Equal(todoAddDto.Title, todo.Title);
        Assert.Equal(todoAddDto.Description, todo.Description);
        Assert.Equal(todoAddDto.CompletionDatePlanned, todo.CompletionDatePlanned);
    }
    
    [Fact]
    public async Task AddToDoThrowExceptionIfDataIsNull()
    {
        var todoOwnerFactory = new ToDoOwnerFactory();
        var todoOwner = todoOwnerFactory.Create();
        
        await Assert.ThrowsAsync<ArgumentNullException>(() => todoOwner.AddToDoAsync(null));
    }

    [Fact]
    public async Task GetToDoAdded()
    {
        var todoOwnerFactory = new ToDoOwnerFactory();
        var todoOwner = todoOwnerFactory.Create();
        var todoAddDto = new ToDoAddDTO();

        var todoCreated = await todoOwner.AddToDoAsync(todoAddDto);
        var todoLoaded = await todoOwner.GetToDoByIdAsync(todoCreated.Id);

        Assert.NotNull(todoLoaded);
        Assert.Equal(todoCreated.Id, todoLoaded.Id);
    }

    [Fact]
    public async Task GetToDoNotExisting()
    {
        var todoOwnerFactory = new ToDoOwnerFactory();
        var todoOwner = todoOwnerFactory.Create();
        var todo = await todoOwner.GetToDoByIdAsync(Guid.Empty);

        Assert.Null(todo);
    }

    [Fact]
    public async Task GetAllToDos()
    {
        var todoOwnerFactory = new ToDoOwnerFactory();
        var todoOwner = todoOwnerFactory.Create();
        var todosBeforeAdd = await todoOwner.GetAllToDosAsync();

        Assert.Empty(todosBeforeAdd);

        var todoAddDto = new ToDoAddDTO();

        await todoOwner.AddToDoAsync(todoAddDto);

        var todosAfterAdd = await todoOwner.GetAllToDosAsync();

        Assert.Single(todosAfterAdd);
    }
}