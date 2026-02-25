using Core.DTO;
using Core.Services;

namespace Tests.Services;

public class AddToDoServiceTest
{
    private readonly AddToDoService _addToDoService = new();
    
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
        var todo = await this._addToDoService.AddToDoAsync(addToDoDto);

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