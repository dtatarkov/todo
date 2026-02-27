using Core.DTO;
using Core.Entities;
using Core.Factories;
using Core.Services;
using Moq;

namespace Tests.Services;

public class AddToDoServiceTests
{
    private readonly AddToDoService _addToDoService;
    private readonly Mock<IToDoOwner> _toDoOwnerMock;

    public AddToDoServiceTests()
    {
        _toDoOwnerMock = new Mock<IToDoOwner>();
        
        var toDoOwnerFactoryMock = new Mock<IToDoOwnerFactory>();
        toDoOwnerFactoryMock.Setup(f => f.Create()).Returns(_toDoOwnerMock.Object);

        _addToDoService = new AddToDoService(toDoOwnerFactoryMock.Object);
    }

    [Fact]
    public async Task AddToDoAsyncShouldReturnToDoWhenDataIsValid()
    {
        var addToDoDto = new ToDoAddDTO
        {
            Title = "Test",
            Description = "Desc",
            CompletionDatePlanned = DateTimeOffset.Now
        };

        var expectedTodo = new ToDo
        {
            Id = Guid.NewGuid(),
            Title = addToDoDto.Title,
            Description = addToDoDto.Description,
            CompletionDatePlanned = addToDoDto.CompletionDatePlanned
        };

        _toDoOwnerMock.Setup(o => o.AddToDoAsync(addToDoDto))
            .ReturnsAsync(expectedTodo);

        var result = await _addToDoService.AddToDoAsync(addToDoDto);

        Assert.NotNull(result);
        Assert.Equal(expectedTodo.Id, result.Id);
        Assert.Equal(expectedTodo.Title, result.Title);
        Assert.Equal(expectedTodo.Description, result.Description);
        Assert.Equal(expectedTodo.CompletionDatePlanned, result.CompletionDatePlanned);
    }

    [Fact]
    public async Task AddToDoAsyncShouldThrowArgumentNullExceptionWhenDataIsNull()
    {
        await Assert.ThrowsAsync<ArgumentNullException>(() => _addToDoService.AddToDoAsync(null!));
    }
}