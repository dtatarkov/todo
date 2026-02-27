using Core.DTO;
using Core.Entities;
using Core.Factories;
using Core.Repositories;
using Moq;

namespace Tests.Entities;

public class ToDoOwnerTests
{
    [Fact]
    public async Task AddToDoReturnsToDoIfDataIsValid()
    {
        var repositoryMock = new Mock<IToDoRepository>();
        var todoOwnerFactory = new ToDoOwnerFactory(repositoryMock.Object);
        var todoOwner = todoOwnerFactory.Create();

        var todoAddDto = new ToDoAddDTO
        {
            Title = "Title",
            Description = "Test",
            CompletionDatePlanned = DateTimeOffset.Now,
        };

        var todo = await todoOwner.AddToDoAsync(todoAddDto);

        Assert.Equal(todoAddDto.Title, todo.Title);
        Assert.Equal(todoAddDto.Description, todo.Description);
        Assert.Equal(todoAddDto.CompletionDatePlanned, todo.CompletionDatePlanned);

        repositoryMock.Verify(repo => repo.AddAsync(It.Is<IToDo>(t =>
            t.Title == todoAddDto.Title &&
            t.Description == todoAddDto.Description &&
            t.CompletionDatePlanned == todoAddDto.CompletionDatePlanned)), Times.Once);
    }

    [Fact]
    public async Task AddToDoThrowExceptionIfDataIsNull()
    {
        var repositoryMock = new Mock<IToDoRepository>();
        var todoOwnerFactory = new ToDoOwnerFactory(repositoryMock.Object);
        var todoOwner = todoOwnerFactory.Create();

        await Assert.ThrowsAsync<ArgumentNullException>(() => todoOwner.AddToDoAsync(null));

        repositoryMock.Verify(repo => repo.AddAsync(It.IsAny<IToDo>()), Times.Never);
    }


    [Fact]
    public async Task GetToDoByIdAsync_ReturnsTodo_WhenIdExists()
    {
        var repositoryMock = new Mock<IToDoRepository>();
        var todoOwnerFactory = new ToDoOwnerFactory(repositoryMock.Object);
        var todoOwner = todoOwnerFactory.Create();

        var expectedTodo = new ToDo
        {
            Id = Guid.NewGuid(),
            Title = "Existing Task",
            Description = "Description",
            CompletionDatePlanned = DateTimeOffset.Now.AddDays(1)
        };

        repositoryMock.Setup(repo => repo.GetByIdAsync(expectedTodo.Id))
            .ReturnsAsync(expectedTodo);

        var result = await todoOwner.GetToDoByIdAsync(expectedTodo.Id);

        Assert.NotNull(result);
        Assert.Equal(expectedTodo.Id, result.Id);
        Assert.Equal(expectedTodo.Title, result.Title);
        Assert.Equal(expectedTodo.Description, result.Description);
        Assert.Equal(expectedTodo.CompletionDatePlanned, result.CompletionDatePlanned);
    }

    [Fact]
    public async Task GetToDoByIdAsync_ReturnsNull_WhenIdDoesNotExist()
    {
        var repositoryMock = new Mock<IToDoRepository>();
        var todoOwnerFactory = new ToDoOwnerFactory(repositoryMock.Object);
        var todoOwner = todoOwnerFactory.Create();
        var nonExistentId = Guid.NewGuid();

        repositoryMock.Setup(repo => repo.GetByIdAsync(nonExistentId))
            .ReturnsAsync((IToDo?)null);

        var result = await todoOwner.GetToDoByIdAsync(nonExistentId);

        Assert.Null(result);
    }

    [Fact]
    public async Task GetToDoByIdAsync_ReturnsNull_WhenGuidIdIsEmpty()
    {
        var repositoryMock = new Mock<IToDoRepository>();
        var todoOwnerFactory = new ToDoOwnerFactory(repositoryMock.Object);
        var todoOwner = todoOwnerFactory.Create();

        var result = await todoOwner.GetToDoByIdAsync(Guid.Empty);

        Assert.Null(result);
        repositoryMock.Verify(repo => repo.GetByIdAsync(Guid.Empty), Times.Never);
    }

    [Fact]
    public async Task GetAllToDosAsync_ReturnsEmptyList_WhenNoTodosExist()
    {
        // Arrange
        var repositoryMock = new Mock<IToDoRepository>();
        var todoOwnerFactory = new ToDoOwnerFactory(repositoryMock.Object);
        var todoOwner = todoOwnerFactory.Create();

        repositoryMock.Setup(repo => repo.GetAllAsync())
            .ReturnsAsync(new List<IToDo>());

        // Act
        var result = await todoOwner.GetAllToDosAsync();

        Assert.Empty(result);
    }

    [Fact]
    public async Task GetAllToDosAsync_ReturnsAllTodos_WhenTodosExist()
    {
        var repositoryMock = new Mock<IToDoRepository>();
        var todoOwnerFactory = new ToDoOwnerFactory(repositoryMock.Object);
        var todoOwner = todoOwnerFactory.Create();

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

        repositoryMock.Setup(repo => repo.GetAllAsync())
            .ReturnsAsync(existingTodos);

        var result = await todoOwner.GetAllToDosAsync();
        var resultList = result.ToList();

        Assert.Equal(2, resultList.Count);
    }
}