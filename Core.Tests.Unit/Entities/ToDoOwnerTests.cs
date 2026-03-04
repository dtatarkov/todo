using Core.Entities;
using Core.Repositories;
using Moq;
using Tests.Unit.Shared.TestData;

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