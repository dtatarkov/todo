using Core.DTO;
using Core.Entities;

namespace Tests.Entities;

public class ToDoOwnerTests
{
    private readonly ToDoOwner _todoOwner = new();
    
    [Fact]
    public async Task AddToDoReturnsToDoIfDataIsValid()
    {
        var todoAddDto = new ToDoAddDTO
        {
            Title = "Title",
            Description = "Test",
            CompletionDatePlanned = DateTimeOffset.Now,
        };

        var todo = await _todoOwner.AddToDoAsync(todoAddDto);

        Assert.Equal(todoAddDto.Title, todo.Title);
        Assert.Equal(todoAddDto.Description, todo.Description);
        Assert.Equal(todoAddDto.CompletionDatePlanned, todo.CompletionDatePlanned);
    }
    
    [Fact]
    public async Task AddToDoThrowExceptionIfDataIsNull()
    {
        await Assert.ThrowsAsync<ArgumentNullException>(() => _todoOwner.AddToDoAsync(null));
    }

    [Fact]
    public async Task GetToDoAdded()
    {
        var todoAddDto = new ToDoAddDTO();

        var todoCreated = await _todoOwner.AddToDoAsync(todoAddDto);
        var todoLoaded = await _todoOwner.GetToDoByIdAsync(todoCreated.Id);

        Assert.NotNull(todoLoaded);
        Assert.Equal(todoCreated.Id, todoLoaded.Id);
    }

    [Fact]
    public async Task GetToDoNotExisting()
    {
        var todoOwner = new ToDoOwner();
        var todo = await todoOwner.GetToDoByIdAsync(Guid.Empty);

        Assert.Null(todo);
    }

    [Fact]
    public async Task GetAllToDos()
    {
        var todosBeforeAdd = await _todoOwner.GetAllToDosAsync();

        Assert.Empty(todosBeforeAdd);

        var todoAddDto = new ToDoAddDTO();

        await _todoOwner.AddToDoAsync(todoAddDto);

        var todosAfterAdd = await _todoOwner.GetAllToDosAsync();

        Assert.Single(todosAfterAdd);
    }
}