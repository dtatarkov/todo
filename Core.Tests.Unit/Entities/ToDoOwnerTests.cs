using Core.DTO;
using Core.Entities;
using Core.Enums;
using Core.Repositories;
using Moq;

namespace Core.Tests.Unit.Entities;

public class ToDoOwnerTests
{
    public static IEnumerable<object[]> GetUpdateFieldsTestData()
    {
        var id = Guid.Empty;
        var now = DateTimeOffset.Now;

        // Сценарий: обновляется только Title
        yield return
        [
            new ToDoUpdateDto
            {
                Id = id,
                Title = "Updated Title",
            },
        ];

        // Сценарий: обновляется только Description
        yield return new object[]
        {
            new ToDoUpdateDto
            {
                Id = id,
                Description = "Updated Description",
            },
        };

        // Сценарий: обновляется только CompletionDatePlanned
        yield return new object[]
        {
            new ToDoUpdateDto
            {
                Id = id,
                CompletionDatePlanned = now.AddDays(10)
            },
        };

        // Сценарий: обновляются все поля
        yield return new object[]
        {
            new ToDoUpdateDto
            {
                Id = id,
                Title = "Updated Title",
                Description = "Updated Description",
                CompletionDatePlanned = now.AddDays(10)
            },
        };
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
    public async Task UpdateToDoAsync_UpdatesExistingTodo_WhenDataIsValid()
    {
        // Arrange
        var todoRepositoryMock = new Mock<IToDoRepository>();
        var todoOwner = new ToDoOwner(todoRepositoryMock.Object);

        var existingId = Guid.NewGuid();

        var existingTodo = new ToDo
        {
            Id = existingId,
            Title = "Old Title",
            Description = "Old Description",
            CompletionDatePlanned = DateTimeOffset.Now.AddDays(-1)
        };

        var updateData = new ToDoUpdateDto
        {
            Id = existingId,
            Title = "Updated Title",
            Description = "Updated Description",
            CompletionDatePlanned = DateTimeOffset.Now.AddDays(5)
        };

        todoRepositoryMock
            .Setup(repo => repo.GetByIdAsync(existingId))
            .ReturnsAsync(existingTodo);

        // Act
        await todoOwner.UpdateToDoAsync(updateData);

        // Assert
        todoRepositoryMock.Verify(repo => repo.GetByIdAsync(existingId), Times.Once);

        todoRepositoryMock.Verify(repo => repo.SaveAsync(It.Is<IToDo>(t =>
            t.Id == existingId &&
            t.Title == updateData.Title &&
            t.Description == updateData.Description &&
            t.CompletionDatePlanned == updateData.CompletionDatePlanned
        )), Times.Once);
    }

    [Theory]
    [MemberData(nameof(GetUpdateFieldsTestData))]
    public async Task UpdateToDoAsync_UpdatesOnlyNonNullFields(ToDoUpdateDto updateData)
    {
        // Arrange
        var todoRepositoryMock = new Mock<IToDoRepository>();
        var todoOwner = new ToDoOwner(todoRepositoryMock.Object);

        var existingId = Guid.NewGuid();
        var now = DateTimeOffset.Now;

        var existingTodo = new ToDo
        {
            Id = existingId,
            Title = "Original Title",
            Description = "Original Description",
            CompletionDatePlanned = now.AddDays(-1),
        };

        var existingToDoSnapshot = existingTodo.Clone();

        updateData.Id = existingId;

        todoRepositoryMock
            .Setup(repo => repo.GetByIdAsync(existingId))
            .ReturnsAsync(existingTodo);

        // Act
        await todoOwner.UpdateToDoAsync(updateData);

        // Assert
        todoRepositoryMock.Verify(repo => repo.SaveAsync(It.Is<IToDo>(t =>
            t.Title == (updateData.Title ?? existingToDoSnapshot.Title) &&
            t.Description == (updateData.Description ?? existingToDoSnapshot.Description) &&
            t.CompletionDatePlanned == (updateData.CompletionDatePlanned ?? existingToDoSnapshot.CompletionDatePlanned)
        )), Times.Once);
    }

    [Fact]
    public async Task UpdateToDoAsync_ThrowsArgumentException_WhenDataHasNoChanges()
    {
        // Arrange
        var todoRepositoryMock = new Mock<IToDoRepository>();
        var todoOwner = new ToDoOwner(todoRepositoryMock.Object);

        var updateData = new ToDoUpdateDto
        {
            Id = Guid.NewGuid()
        };

        // Act & Assert
        await Assert.ThrowsAsync<ArgumentException>(() => todoOwner.UpdateToDoAsync(updateData));
        todoRepositoryMock.Verify(repo => repo.GetByIdAsync(It.IsAny<Guid>()), Times.Never);
        todoRepositoryMock.Verify(repo => repo.SaveAsync(It.IsAny<IToDo>()), Times.Never);
    }

    [Fact]
    public async Task UpdateToDoAsync_ThrowsInvalidOperationException_WhenTodoDoesNotExist()
    {
        // Arrange
        var todoRepositoryMock = new Mock<IToDoRepository>();
        var todoOwner = new ToDoOwner(todoRepositoryMock.Object);

        var nonExistentId = Guid.NewGuid();

        var updateData = new ToDoUpdateDto
        {
            Id = nonExistentId,
            Title = "New Title"
        };

        todoRepositoryMock
            .Setup(repo => repo.GetByIdAsync(nonExistentId))
            .ReturnsAsync((IToDo?)null);

        // Act & Assert
        await Assert.ThrowsAsync<InvalidOperationException>(() => todoOwner.UpdateToDoAsync(updateData));
        todoRepositoryMock.Verify(repo => repo.SaveAsync(It.IsAny<IToDo>()), Times.Never);
    }

    [Fact]
    public async Task UpdateToDoAsync_ThrowsArgumentNullException_WhenDataIsNull()
    {
        // Arrange
        var todoRepositoryMock = new Mock<IToDoRepository>();
        var todoOwner = new ToDoOwner(todoRepositoryMock.Object);

        // Act & Assert
        await Assert.ThrowsAsync<ArgumentNullException>(() => todoOwner.UpdateToDoAsync(null!));
        todoRepositoryMock.Verify(repo => repo.GetByIdAsync(It.IsAny<Guid>()), Times.Never);
        todoRepositoryMock.Verify(repo => repo.SaveAsync(It.IsAny<IToDo>()), Times.Never);
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

    [Fact]
    public async Task RemoveToDoAsync_RemovesExistingTodo_WhenIdIsValid()
    {
        // Arrange
        var todoRepositoryMock = new Mock<IToDoRepository>();
        var todoOwner = new ToDoOwner(todoRepositoryMock.Object);

        var existingId = Guid.NewGuid();

        // Act
        await todoOwner.RemoveToDoAsync(existingId);

        // Assert
        todoRepositoryMock.Verify(repo => repo.RemoveAsync(existingId), Times.Once);
    }
}