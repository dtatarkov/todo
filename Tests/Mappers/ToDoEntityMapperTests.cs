using Core.Entities;
using Core.Enums;
using Db.Postgre.Entities;
using Db.Postgre.Mappers;

namespace Tests.Mappers;

public class ToDoEntityMapperTests
{
    private readonly ToDoEntityMapper _todoEntityMapper = new();
    
    public static IEnumerable<object[]> GetValidToDoTestCases()
    {
        var now = DateTimeOffset.Now;

        yield return
        [
            new ToDo()
        ];

        yield return
        [
            new ToDo
            {
                Id = Guid.NewGuid(),
                Title = "Task in Progress",
                Description = "Working on it",
                CompletionDatePlanned = now.AddDays(2),
            }
        ];

        yield return
        [
            new ToDo
            {
                Id = Guid.NewGuid(),
                Title = "Completed Task",
                Description = "Finished successfully",
                CompletionDatePlanned = now.AddDays(-1),
                CompletionDateActual = now,
                State = ToDoState.GetState(ToDoStateType.Completed)
            }
        ];
    }
    
    public static IEnumerable<object[]> GetValidEntityTestCases()
    {
        var now = DateTimeOffset.Now;

        yield return
        [
            new PostgreToDoEntity()
        ];

        yield return
        [
            new PostgreToDoEntity
            {
                Id = Guid.NewGuid(),
                Title = "Task in Progress",
                Description = "Working on it",
                CompletionDatePlanned = now.AddDays(2),
            }
        ];

        yield return
        [
            new PostgreToDoEntity
            {
                Id = Guid.NewGuid(),
                Title = "Completed Task",
                Description = "Finished successfully",
                CompletionDatePlanned = now.AddDays(-1),
                CompletionDateActual = now,
                StateType = ToDoStateType.Completed
            }
        ];
    }

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

    [Theory]
    [MemberData(nameof(GetValidToDoTestCases))]
    public void ToEntity_WhenValidTodo_ShouldMapAllProperties(IToDo todo)
    {
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

    [Theory]
    [MemberData(nameof(GetValidEntityTestCases))]
    public void ToDomainModel_WhenValidEntity_ShouldMapAllProperties(PostgreToDoEntity entity)
    {
        // Act
        var todo = _todoEntityMapper.ToDomainModel(entity);

        // Assert
        Assert.Equal(entity.Id, todo.Id);
        Assert.Equal(entity.Title, todo.Title);
        Assert.Equal(entity.Description, entity.Description);
        Assert.Equal(entity.CompletionDatePlanned, todo.CompletionDatePlanned);
        Assert.Equal(entity.CompletionDateActual, todo.CompletionDateActual);
        Assert.Equal(entity.StateType, todo.State.Type);
    }
}