using Core.Entities;
using Core.Enums;
using Db.Postgre.Entities;
using Db.Postgre.Mappers;

namespace Tests.Mappers;

public class ToDoEntityMapperTests
{
    private readonly ToDoEntityMapper _todoEntityMapper = new();

    [Fact]
    public void ToEntity_WhenTodoIsNull_ShouldThrowArgumentNullException()
    {
        // Act & Assert
        Assert.Throws<ArgumentNullException>(() => _todoEntityMapper.ToEntity(null!));
    }

    [Fact]
    public void ToDomainModel_WhenEntityIsNull_ShouldThrowArgumentNullException()
    {
        // Act & Assert
        Assert.Throws<ArgumentNullException>(() => _todoEntityMapper.ToDomainModel(null!));
    }

    [Fact]
    public void ToEntity_WhenValidTodo_ShouldMapAllProperties()
    {
        // Arrange
        var todo = new ToDo
        {
            Id = Guid.NewGuid(),
            Title = "Test Title",
            Description = "Test Description",
            CompletionDatePlanned = DateTimeOffset.Now.AddDays(1),
            CompletionDateActual = DateTimeOffset.Now,
            State = ToDoState.GetState(ToDoStateType.Completed)
        };

        // Act
        var entity = _todoEntityMapper.ToEntity(todo);

        // Assert
        Assert.Equal(todo.Id, entity.Id);
        Assert.Equal(todo.Title, entity.Title);
        Assert.Equal(todo.Description, entity.Description);
        Assert.Equal(todo.CompletionDatePlanned, entity.CompletionDatePlanned);
        Assert.Equal(todo.CompletionDateActual, entity.CompletionDateActual);
        Assert.Equal(todo.State.Type, entity.StateType);
    }

    [Fact]
    public void ToDomainModel_WhenValidEntity_ShouldMapAllProperties()
    {
        // Arrange
        var entity = new PostgreToDoEntity
        {
            Id = Guid.NewGuid(),
            Title = "Entity Title",
            Description = "Entity Description",
            CompletionDatePlanned = DateTimeOffset.Now.AddDays(1),
            CompletionDateActual = DateTimeOffset.Now,
            StateType = ToDoStateType.Completed
        };

        // Act
        var todo = _todoEntityMapper.ToDomainModel(entity);

        // Assert
        Assert.Equal(entity.Id, todo.Id);
        Assert.Equal(entity.Title, todo.Title);
        Assert.Equal(entity.Description, entity.Description);
        Assert.Equal(entity.CompletionDatePlanned, todo.CompletionDatePlanned);
        Assert.Equal(entity.CompletionDateActual, todo.CompletionDateActual);
        Assert.Equal(ToDoStateType.Completed, todo.State.Type);
    }
}