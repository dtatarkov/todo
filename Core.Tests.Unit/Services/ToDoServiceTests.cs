using Core.Entities;
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
            .Setup(o => o.AddToDoAsync(addDto))
            .ReturnsAsync(todo);

        // Act
        var result = await _toDoService.AddToDoAsync(addDto);

        // Assert
        Assert.NotNull(result);
        Assert.True(expectedDto.Equals(result));
    }
    
    [Fact]
    public async Task AddToDoAsync_ThrowsArgumentNullException_WhenDataIsNull()
    {
        // Act & Assert
        await Assert.ThrowsAsync<ArgumentNullException>(() => _toDoService.AddToDoAsync(null!));
    }

    [Fact]
    public async Task GetToDoByIdAsync_ReturnsToDoGetDto_WhenExists()
    {
        // Arrange
        var id = Guid.NewGuid();

        var todo = ToDoTestData.GetDefault();
        var expectedDto = todo.GetData();

        _toDoOwnerMock
            .Setup(o => o.GetToDoByIdAsync(id))
            .ReturnsAsync(todo);

        // Act
        var result = await _toDoService.GetToDoByIdAsync(id);

        // Assert
        Assert.NotNull(result);
        Assert.True(expectedDto.Equals(result));
    }

    [Fact]
    public async Task GetToDoByIdAsync_ReturnsNull_WhenNotFound()
    {
        // Arrange
        var id = Guid.NewGuid();

        _toDoOwnerMock
            .Setup(o => o.GetToDoByIdAsync(id))
            .ReturnsAsync((IToDo?)null);

        // Act
        var result = await _toDoService.GetToDoByIdAsync(id);

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
    public async Task UpdateToDoAsync_ForwardsCall()
    {
        // Arrange
        var updateDto = ToDoUpdateDtoTestData.GetDefault();

        _toDoOwnerMock
            .Setup(o => o.UpdateToDoAsync(updateDto))
            .Returns(Task.CompletedTask);

        // Act & Assert
        await _toDoService.UpdateToDoAsync(updateDto);
        _toDoOwnerMock.Verify(o => o.UpdateToDoAsync(updateDto), Times.Once);
    }

    [Fact]
    public async Task RemoveToDoAsync_ForwardsCall()
    {
        // Arrange
        var id = Guid.NewGuid();

        _toDoOwnerMock
            .Setup(o => o.RemoveToDoAsync(id))
            .Returns(Task.CompletedTask);

        // Act & Assert
        await _toDoService.RemoveToDoAsync(id);
        _toDoOwnerMock.Verify(o => o.RemoveToDoAsync(id), Times.Once);
    }

    [Fact]
    public async Task CompleteToDoAsync_CompletesExistingToDo()
    {
        // Arrange
        var id = Guid.NewGuid();
        var todo = ToDoTestData.GetDefault(id);

        _toDoOwnerMock
            .Setup(o => o.GetToDoByIdAsync(id))
            .ReturnsAsync(todo);

        // Act
        await _toDoService.CompleteToDoAsync(id);

        // Assert
        Assert.True(todo.IsCompleted);
    }
}