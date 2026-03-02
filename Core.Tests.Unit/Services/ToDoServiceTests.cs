using Core.DTO;
using Core.Entities;
using Core.Enums;
using Core.Factories;
using Core.Services;
using Moq;

namespace Core.Tests.Unit.Services;

public class ToDoServiceTests
{
    private readonly Mock<IToDoOwner> _toDoOwnerMock;
    private readonly IToDoService _toDoService;

    public ToDoServiceTests()
    {
        _toDoOwnerMock = new Mock<IToDoOwner>();

        var toDoOwnerFactoryMock = new Mock<IToDoOwnerFactory>();
        toDoOwnerFactoryMock.Setup(f => f.Create()).Returns(_toDoOwnerMock.Object);

        _toDoService = new ToDoService(toDoOwnerFactoryMock.Object);
    }

    [Fact]
    public async Task AddToDoAsync_ReturnsToDo_WhenDataIsValid()
    {
        // Arrange
        var addToDoDto = new ToDoAddDto
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

        _toDoOwnerMock
            .Setup(o => o.AddToDoAsync(addToDoDto))
            .ReturnsAsync(expectedTodo);

        // Act
        var result = await _toDoService.AddToDoAsync(addToDoDto);

        // Assert
        _toDoOwnerMock.Verify(o => o.AddToDoAsync(addToDoDto), Times.Once);
        Assert.Same(expectedTodo, result);
    }

    [Fact]
    public async Task AddToDoAsync_ThrowsArgumentNullException_WhenDataIsNull()
    {
        // Act & Assert
        await Assert.ThrowsAsync<ArgumentNullException>(() => _toDoService.AddToDoAsync(null!));
    }

    [Fact]
    public async Task CompleteToDoAsync_CompletesExistingToDo()
    {
        // Arrange
        var existingTodo = new ToDo
        {
            Id = Guid.NewGuid(),
            State = ToDoState.GetState(ToDoStateType.Initial),
            CompletionDateActual = null
        };

        _toDoOwnerMock
            .Setup(o => o.GetToDoByIdAsync(existingTodo.Id))
            .ReturnsAsync(existingTodo);

        // Act
        await _toDoService.CompleteToDoAsync(existingTodo.Id);

        // Assert
        Assert.True(existingTodo.IsCompleted);
        Assert.NotNull(existingTodo.CompletionDateActual);
        Assert.True(existingTodo.CompletionDateActual <= DateTimeOffset.Now);
    }

    [Fact]
    public async Task CompleteToDoAsync_ThrowsArgumentException_ForNonExistentId()
    {
        // Arrange
        var nonExistentId = Guid.NewGuid();

        _toDoOwnerMock
            .Setup(o => o.GetToDoByIdAsync(nonExistentId))
            .ReturnsAsync((IToDo?)null);

        // Act & Assert
        await Assert.ThrowsAsync<ArgumentException>(() => _toDoService.CompleteToDoAsync(nonExistentId));
    }
}