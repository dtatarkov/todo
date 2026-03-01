using Core.DTO;
using Core.Entities;
using Core.Exceptions;
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
        yield return
        [
            new ToDoUpdateDto
            {
                Id = id,
                Description = "Updated Description",
            }
        ];

        // Сценарий: обновляется только CompletionDatePlanned
        yield return
        [
            new ToDoUpdateDto
            {
                Id = id,
                CompletionDatePlanned = now.AddDays(10)
            }
        ];

        // Сценарий: обновляются все поля
        yield return
        [
            new ToDoUpdateDto
            {
                Id = id,
                Title = "Updated Title",
                Description = "Updated Description",
                CompletionDatePlanned = now.AddDays(10)
            }
        ];
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
        todoRepositoryMock.Verify(repo => repo.GetByIdAsync(existingId), Times.Once);
        
        todoRepositoryMock.Verify(repo => repo.SaveAsync(It.Is<IToDo>(t =>
            t.Id == existingId &&
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
    public async Task UpdateToDoAsync_ThrowsEntityNotFoundException_WhenTodoDoesNotExist()
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
        await Assert.ThrowsAsync<EntityNotFoundException>(() => todoOwner.UpdateToDoAsync(updateData));
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
}