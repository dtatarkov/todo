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
            Description = "Old Description"
        };

        var updateData = new ToDoUpdateDto
        {
            Id = existingId,
            Title = "Updated Title",
            Description = "Updated Description",
            CompletionDatePlanned = DateTimeOffset.Now,
        };

        todoRepositoryMock
            .Setup(repo => repo.GetByIdAsync(existingId))
            .ReturnsAsync(existingTodo);

        // Act
        await todoOwner.UpdateToDoAsync(updateData);

        // Assert
        Assert.Equal(existingTodo.Title, updateData.Title);
        Assert.Equal(existingTodo.Description, updateData.Description);
        Assert.Equal(existingTodo.CompletionDatePlanned, updateData.CompletionDatePlanned);
        
        todoRepositoryMock.Verify(repo => repo.SaveAsync(existingTodo), Times.Once);
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