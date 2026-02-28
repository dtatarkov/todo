using Core.DTO;
using Core.Entities;
using Core.Repositories;
using Moq;

namespace Core.Tests.Unit.Entities;

public class ToDoOwnerTests
{
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
            repository => repository.AddAsync(It.Is<IToDo>(todo => todo == todoAdded)), Times.Once);
    }

    [Fact]
    public async Task AddToDoThrowExceptionIfDataIsNull()
    {
        var todoRepositoryMock = new Mock<IToDoRepository>();
        var todoOwner = new ToDoOwner(todoRepositoryMock.Object);

        await Assert.ThrowsAsync<ArgumentNullException>(() => todoOwner.AddToDoAsync(null!));

        todoRepositoryMock.Verify(repo => repo.AddAsync(It.IsAny<IToDo>()), Times.Never);
    }

    [Fact]
    public async Task GetToDoByIdAsync_ReturnsTodo_WhenIdExists()
    {
        // Arrange
        var todoRepositoryMock = new Mock<IToDoRepository>();
        var todoOwner = new ToDoOwner(todoRepositoryMock.Object);

        var expectedId = Guid.NewGuid();

        var expectedTodo = new ToDo
        {
            Id = expectedId,
        };

        todoRepositoryMock
            .Setup(repo => repo.GetByIdAsync(expectedId))
            .ReturnsAsync(expectedTodo);

        // Act
        var result = await todoOwner.GetToDoByIdAsync(expectedId);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(expectedId, result.Id);
        todoRepositoryMock.Verify(repo => repo.GetByIdAsync(expectedId), Times.Once);
    }

    [Fact]
    public async Task GetToDoByIdAsync_ReturnsNull_WhenIdDoesNotExist()
    {
        var todoRepositoryMock = new Mock<IToDoRepository>();
        var todoOwner = new ToDoOwner(todoRepositoryMock.Object);

        var nonExistentId = Guid.NewGuid();

        todoRepositoryMock
            .Setup(repo => repo.GetByIdAsync(nonExistentId))
            .ReturnsAsync((IToDo?)null);

        var result = await todoOwner.GetToDoByIdAsync(nonExistentId);

        Assert.Null(result);
    }

    [Fact]
    public async Task GetAllToDosAsync_ReturnsEmptyList_WhenNoTodosExist()
    {
        var todoRepositoryMock = new Mock<IToDoRepository>();
        var todoOwner = new ToDoOwner(todoRepositoryMock.Object);

        todoRepositoryMock
            .Setup(repo => repo.GetAllAsync())
            .ReturnsAsync(new List<IToDo>());

        var result = await todoOwner.GetAllToDosAsync();

        Assert.Empty(result);
    }

    [Fact]
    public async Task GetAllToDosAsync_ReturnsAllTodos_WhenTodosExist()
    {
        var todoRepositoryMock = new Mock<IToDoRepository>();
        var todoOwner = new ToDoOwner(todoRepositoryMock.Object);

        var existingTodos = new List<IToDo>
        {
            new ToDo
            {
                Id = Guid.NewGuid(),
                Title = "Task 1",
                Description = "Description 1",
                CompletionDatePlanned = DateTimeOffset.Now.AddDays(1)
            },
            new ToDo
            {
                Id = Guid.NewGuid(),
                Title = "Task 2",
                Description = "Description 2",
                CompletionDatePlanned = DateTimeOffset.Now.AddDays(2)
            }
        };

        todoRepositoryMock
            .Setup(repo => repo.GetAllAsync())
            .ReturnsAsync(existingTodos);

        var result = await todoOwner.GetAllToDosAsync();
        var resultList = result.ToList();

        Assert.Equal(2, resultList.Count);
    }
}