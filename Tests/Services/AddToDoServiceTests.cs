using Core.DTO;
using Core.Factories;
using Core.Services;

namespace Tests.Services;

public class AddToDoServiceTests
{
    private readonly IAddToDoService _addToDoService;

    public AddToDoServiceTests()
    {
        IToDoOwnerFactory toDoOwnerFactory = new ToDoOwnerFactory();
        
        _addToDoService = new AddToDoService(toDoOwnerFactory);
    }

    [Fact]
    public async Task AddToDoAsyncShouldReturnToDoWhenDataIsValid()
    {
        // Arrange
        var addToDoDto = new ToDoAddDTO
        {
            Title = "Test",
            Description = "Desc",
            CompletionDatePlanned = DateTimeOffset.Now
        };

        // Act
        var todo = await _addToDoService.AddToDoAsync(addToDoDto);

        // Assert
        Assert.NotEqual(todo.Id, Guid.Empty);
        Assert.Equal(addToDoDto.Title, todo.Title);
        Assert.Equal(addToDoDto.Description, todo.Description);
        Assert.Equal(addToDoDto.CompletionDatePlanned, todo.CompletionDatePlanned);
    }

    [Fact]
    public async Task AddToDoAsyncShouldThrowArgumentNullExceptionWhenDataIsNull()
    {
        await Assert.ThrowsAsync<ArgumentNullException>(() => _addToDoService.AddToDoAsync(null));
    }
}