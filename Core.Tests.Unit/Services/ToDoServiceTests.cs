using Core.Entities;
using Core.Exceptions;
using Core.Factories;
using Core.Services;
using Core.Tests.Unit.TestData;
using Moq;

namespace Core.Tests.Unit.Services;

public class ToDoServiceTests
{
    private readonly Mock<IToDoOwner> _toDoOwnerMock;
    private readonly ToDoService _toDoService;

    public ToDoServiceTests()
    {
        _toDoOwnerMock = new Mock<IToDoOwner>();

        var toDoOwnerFactoryMock = new Mock<IToDoOwnerFactory>();
        toDoOwnerFactoryMock.Setup(f => f.Create()).Returns(_toDoOwnerMock.Object);

        _toDoService = new ToDoService(toDoOwnerFactoryMock.Object);
    }

    [Fact]
    public async Task AddToDoAsync_ReturnsToDoGetDto_WhenDataIsValid()
    {
        // Arrange
        var addDto = ToDoAddDtoTestData.GetDefault();
        var todo = ToDo.CreateFromData(addDto);

        var expectedDto = todo.GetData();

        _toDoOwnerMock
            .Setup(o => o.SaveAsync(It.IsAny<IToDo>()))
            .Returns(Task.CompletedTask);

        // Act
        var result = await _toDoService.AddToDoAsync(addDto);

        // Assert
        Assert.NotNull(result);
        Assert.True(expectedDto.Equals(result));
        
        _toDoOwnerMock.Verify(o => o.SaveAsync(It.Is<IToDo>(t => t.Id == todo.Id)), Times.Once);
    }
    
    [Fact]
    public async Task AddToDoAsync_ThrowsArgumentNullException_WhenDataIsNull()
    {
        // Act & Assert
        await Assert.ThrowsAsync<ArgumentNullException>(() => _toDoService.AddToDoAsync(null!));
    
        // Убедимся, что SaveAsync не был вызван
        _toDoOwnerMock.Verify(o => o.SaveAsync(It.IsAny<IToDo>()), Times.Never);
    }

    [Fact]
    public async Task GetToDoByIdAsync_ReturnsToDoGetDto_WhenExists()
    {
        // Arrange
        var todoId = Guid.NewGuid();
        var todo = ToDoTestData.GetDefault();
        var expectedDto = todo.GetData();

        _toDoOwnerMock
            .Setup(o => o.GetToDoByIdAsync(todoId))
            .ReturnsAsync(todo);

        // Act
        var result = await _toDoService.GetToDoByIdAsync(todoId);

        // Assert
        Assert.NotNull(result);
        Assert.True(expectedDto.Equals(result));
    }

    [Fact]
    public async Task GetToDoByIdAsync_ReturnsNull_WhenNotFound()
    {
        // Arrange
        var todoId = Guid.NewGuid();

        _toDoOwnerMock
            .Setup(o => o.GetToDoByIdAsync(todoId))
            .ReturnsAsync((IToDo?)null);

        // Act
        var result = await _toDoService.GetToDoByIdAsync(todoId);

        // Assert
        Assert.Null(result);
    }

    [Fact]
    public async Task GetAllToDosAsync_ReturnsListOfToDoGetDto()
    {
        // Arrange
        var todos = new List<IToDo>
        {
            ToDoTestData.GetDefault(),
            ToDoTestData.GetDefault(),
        };

        var expectedDtos = todos.Select(t => t.GetData()).ToList();

        _toDoOwnerMock
            .Setup(o => o.GetAllToDosAsync())
            .ReturnsAsync(todos);

        // Act
        var result = await _toDoService.GetAllToDosAsync();
        var resultList = result.ToList();
        
        // Assert
        Assert.Equal(2, resultList.Count);
        Assert.Contains(expectedDtos, todo => todo.Id == todos[0].Id);
        Assert.Contains(expectedDtos, todo => todo.Id == todos[0].Id);
    }

    [Fact]
    public async Task UpdateToDoAsync_UpdatesTodoWhenDataIsValid()
    {
        // Arrange
        var todoId = Guid.NewGuid();
        var updateDto = ToDoUpdateDtoTestData.GetDefault();
        var todo = ToDoTestData.GetDefault(todoId, _toDoOwnerMock.Object);

        _toDoOwnerMock
            .Setup(o => o.GetToDoByIdAsync(todoId))
            .ReturnsAsync(todo);

        // Act
        await _toDoService.UpdateToDoAsync(todoId, updateDto);

        // Assert
        _toDoOwnerMock.Verify(o => o.GetToDoByIdAsync(todoId), Times.Once);
        _toDoOwnerMock.Verify(o => o.SaveAsync(todo), Times.Once);
    }
    
    [Fact]
    public async Task UpdateToDoAsync_ThrowsEntityNotFoundException_WhenToDoDoesNotExist()
    {
        // Arrange
        var todoId = Guid.NewGuid();
        var updateDto = ToDoUpdateDtoTestData.GetDefault();

        _toDoOwnerMock
            .Setup(o => o.GetToDoByIdAsync(todoId))
            .ReturnsAsync((IToDo?)null);

        // Act & Assert
        await Assert.ThrowsAsync<EntityNotFoundException>(() => _toDoService.UpdateToDoAsync(todoId, updateDto));
    
        _toDoOwnerMock.Verify(o => o.SaveAsync(It.IsAny<IToDo>()), Times.Never);
    }

    [Fact]
    public async Task RemoveToDoAsync_ForwardsCall()
    {
        // Arrange
        var todoId = Guid.NewGuid();

        _toDoOwnerMock
            .Setup(o => o.RemoveToDoAsync(todoId))
            .Returns(Task.CompletedTask);

        // Act & Assert
        await _toDoService.RemoveToDoAsync(todoId);
        _toDoOwnerMock.Verify(o => o.RemoveToDoAsync(todoId), Times.Once);
    }

    [Fact]
    public async Task CompleteToDoAsync_CompletesExistingToDo()
    {
        // Arrange
        var todoId = Guid.NewGuid();
        var todo = ToDoTestData.GetDefault(todoId);

        _toDoOwnerMock
            .Setup(o => o.GetToDoByIdAsync(todoId))
            .ReturnsAsync(todo);

        // Act
        await _toDoService.CompleteToDoAsync(todoId);

        // Assert
        Assert.True(todo.IsCompleted);
    }
}