using Core.Entities;
using Core.Enums;

namespace Core.Tests.Unit.Entities;

public class ToDoTests
{
    [Fact]
    public void Constructor_ShouldInitializeWithDefaultValues()
    {
        // Arrange & Act
        var todo = new ToDo();

        // Assert
        Assert.Equal(Guid.Empty, todo.Id);
        Assert.Equal(string.Empty, todo.Title);
        Assert.Equal(string.Empty, todo.Description);
        Assert.Null(todo.CompletionDatePlanned);
        Assert.Null(todo.CompletionDateActual);
        Assert.NotNull(todo.State);
        Assert.Equal(ToDoStateType.Initial, todo.State.Type);
        Assert.False(todo.IsCompleted);
    }

    [Fact]
    public void IsCompleted_ReturnsTrue_WhenStateIsCompleted()
    {
        // Arrange
        var todo = new ToDo
        {
            State = ToDoState.GetState(ToDoStateType.Completed)
        };

        // Assert
        Assert.True(todo.IsCompleted);
    }

    [Fact]
    public void IsCompleted_ReturnsFalse_WhenStateIsInitial()
    {
        // Arrange
        var todo = new ToDo
        {
            State = ToDoState.GetState(ToDoStateType.Initial)
        };

        // Assert
        Assert.False(todo.IsCompleted);
    }

    [Fact]
    public void Clone_ReturnsNewInstance_WithSamePropertyValues()
    {
        // Arrange
        var now = DateTimeOffset.Now;
        
        var original = new ToDo
        {
            Id = Guid.NewGuid(),
            Title = "Test Title",
            Description = "Test Description",
            CompletionDatePlanned = now.AddDays(1),
            CompletionDateActual = now,
            State = ToDoState.GetState(ToDoStateType.Completed)
        };

        // Act
        var clone = original.Clone();

        // Assert
        Assert.NotSame(original, clone);
        Assert.Equal(original.Id, clone.Id);
        Assert.Equal(original.Title, clone.Title);
        Assert.Equal(original.Description, clone.Description);
        Assert.Equal(original.CompletionDatePlanned, clone.CompletionDatePlanned);
        Assert.Equal(original.CompletionDateActual, clone.CompletionDateActual);
        Assert.Same(original.State, clone.State);
        Assert.Equal(original.IsCompleted, clone.IsCompleted);
    }
}