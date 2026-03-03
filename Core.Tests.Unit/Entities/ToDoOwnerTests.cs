using Core.DTO;
using Core.Entities;
using Core.Exceptions;
using Core.Repositories;
using Core.Tests.Unit.TestData;
using Moq;

namespace Core.Tests.Unit.Entities;

public class ToDoOwnerTests
{
    [Fact]
    public async Task SaveAsync_SavesTodo_WhenTodoIsValid()
    {
        // Arrange
        var todoRepositoryMock = new Mock<IToDoRepository>();
        var todoOwner = new ToDoOwner(todoRepositoryMock.Object);
        var todo = ToDoTestData.GetDefault();

        // Act
        await todoOwner.SaveAsync(todo);

        // Assert
        todoRepositoryMock.Verify(repo => repo.SaveAsync(todo), Times.Once);
    }

    [Fact]
    public async Task SaveAsync_ThrowsArgumentNullException_WhenTodoIsNull()
    {
        // Arrange
        var todoRepositoryMock = new Mock<IToDoRepository>();
        var todoOwner = new ToDoOwner(todoRepositoryMock.Object);

        // Act & Assert
        await Assert.ThrowsAsync<ArgumentNullException>(() => todoOwner.SaveAsync(null!));

        // Убедимся, что SaveAsync репозитория не вызывался
        todoRepositoryMock.Verify(repo => repo.SaveAsync(It.IsAny<IToDo>()), Times.Never);
    }

    [Fact]
    public async Task AddToDoReturnsToDoIfDataIsValid()
    {
        var todoRepositoryMock = new Mock<IToDoRepository>();
        var todoOwner = new ToDoOwner(todoRepositoryMock.Object);

        var todoAddDto = new ToDoAddDto
        {
            Title = "Title",
            Description = "Test",
            CompletionDatePlanned = DateTimeOffset.Now,
        };

        var todoAdded = await todoOwner.AddToDoAsync(todoAddDto);

        Assert.Equal(todoAddDto.Title, todoAdded.Title);
        Assert.Equal(todoAddDto.Description, todoAdded.Description);
        Assert.Equal(todoAddDto.CompletionDatePlanned, todoAdded.CompletionDatePlanned);

        todoRepositoryMock.Verify(
            repository => repository.SaveAsync(It.Is<IToDo>(todo => todo == todoAdded)), Times.Once);
    }

    [Fact]
    public async Task AddToDoThrowExceptionIfDataIsNull()
    {
        var todoRepositoryMock = new Mock<IToDoRepository>();
        var todoOwner = new ToDoOwner(todoRepositoryMock.Object);

        await Assert.ThrowsAsync<ArgumentNullException>(() => todoOwner.AddToDoAsync(null!));

        todoRepositoryMock.Verify(repo => repo.SaveAsync(It.IsAny<IToDo>()), Times.Never);
    }

    [Fact]
    public async Task GetToDoByIdAsync_AssignsOwnerToRetrievedToDo()
    {
        // Arrange
        var todoRepositoryMock = new Mock<IToDoRepository>();
        var todoOwner = new ToDoOwner(todoRepositoryMock.Object);

        var todoId = Guid.NewGuid();
        var expectedTodo = ToDoTestData.GetDefault(todoId);

        todoRepositoryMock
            .Setup(repo => repo.GetByIdAsync(todoId))
            .ReturnsAsync(expectedTodo);

        // Act
        var result = await todoOwner.GetToDoByIdAsync(todoId);

        // Assert
        var toDoWithOwner = Assert.IsAssignableFrom<ToDo>(result);
        Assert.Same(todoOwner, toDoWithOwner.Owner);
    }
    
    [Fact]
    public async Task GetAllToDosAsync_AssignsOwnerToAllRetrievedToDos()
    {
        // Arrange
        var todoRepositoryMock = new Mock<IToDoRepository>();
        var todoOwner = new ToDoOwner(todoRepositoryMock.Object);

        var todosFromRepo = new List<IToDo>
        {
            ToDoTestData.GetDefault(),
            ToDoTestData.GetDefault()
        };
        
        todoRepositoryMock
            .Setup(repo => repo.GetAllAsync())
            .ReturnsAsync(todosFromRepo);

        // Act
        var result = await todoOwner.GetAllToDosAsync();

        foreach (var todo in result)
        {
            var toDoWithOwner = Assert.IsAssignableFrom<ToDo>(todo);
            Assert.Same(todoOwner, toDoWithOwner.Owner);
        }
    }
}