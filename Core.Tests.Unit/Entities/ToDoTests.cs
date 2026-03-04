using Core.DTO;
using Core.Entities;
using Core.Enums;
using Core.Tests.Unit.TestData;
using Moq;

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
    public async Task SaveAsync_ThrowsArgumentNullException_WhenOwnerIsNull()
    {
        // Arrange
        var todo = new ToDo();
    
        // Act & Assert
        await Assert.ThrowsAsync<ArgumentNullException>(() => todo.SaveAsync());
    }

    [Fact]
    public async Task SaveAsync_CallsOwnerSaveAsync_WhenOwnerExists()
    {
        // Arrange
        var ownerMock = new Mock<IToDoOwner>();
        var todo = ToDoTestData.GetDefault(ownerMock.Object);
    
        // Act
        await todo.SaveAsync();
    
        // Assert
        ownerMock.Verify(o => o.SaveAsync(todo), Times.Once);
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

    [Fact]
    public void CreateFromData_CreatesValidToDo()
    {
        // Arrange
        var now = DateTimeOffset.Now;

        var dto = new ToDoAddDto
        {
            Title = "New Task",
            Description = "Description",
            CompletionDatePlanned = now.AddDays(1)
        };

        // Act
        var todo = ToDo.CreateFromData(dto);

        // Assert
        Assert.Equal(Guid.Empty, todo.Id);
        Assert.Equal(dto.Title, todo.Title);
        Assert.Equal(dto.Description, todo.Description);
        Assert.Equal(dto.CompletionDatePlanned, todo.CompletionDatePlanned);
        Assert.Equal(ToDoStateType.Initial, todo.State.Type);
    }

    [Fact]
    public void CreateFromData_ThrowsArgumentNullException_WhenDtoIsNull()
    {
        // Act & Assert
        Assert.Throws<ArgumentNullException>(() => ToDo.CreateFromData(null!));
    }

    [Theory]
    [MemberData(nameof(GetUpdateFieldsTestData))]
    public async Task UpdateFromDataAsync_UpdatesOnlyProvidedFields(ToDoUpdateDto updateDto)
    {
        var ownerMock = new Mock<IToDoOwner>();
        var todo = ToDoTestData.GetDefault(ownerMock.Object);
        var todoClone = todo.Clone();

        // Act
        await todo.UpdateFromDataAsync(updateDto);

        // Assert
        Assert.Equal(todo.Title, updateDto.Title ?? todoClone.Title);
        Assert.Equal(todo.Description, updateDto.Description ?? todoClone.Description);
        Assert.Equal(todo.CompletionDatePlanned, updateDto.CompletionDatePlanned ?? todoClone.CompletionDatePlanned);
        Assert.Equal(updateDto.Title ?? todoClone.Title, todo.Title);
        Assert.Equal(updateDto.Description ?? todoClone.Description, todo.Description);
        Assert.Equal(updateDto.CompletionDatePlanned ?? todoClone.CompletionDatePlanned, todo.CompletionDatePlanned);
        
        ownerMock.Verify(o => o.SaveAsync(It.Is<IToDo>(t => t == todo)), Times.Once);
    }
    
    [Fact]
    public async Task UpdateToDoAsync_ThrowsArgumentException_WhenDataHasNoChanges()
    {
        // Arrange
        var ownerMock = new Mock<IToDoOwner>();
        var todo = ToDoTestData.GetDefault(ownerMock.Object);

        var updateData = ToDoUpdateDtoTestData.GetEmpty();

        // Act & Assert
        await Assert.ThrowsAsync<InvalidOperationException>(() => todo.UpdateFromDataAsync(updateData));
        ownerMock.Verify(owner => owner.SaveAsync(It.IsAny<IToDo>()), Times.Never);
    }

    [Fact]
    public async Task UpdateToDoAsync_ThrowsArgumentNullException_WhenDataIsNull()
    {
        // Arrange
        var ownerMock = new Mock<IToDoOwner>();
        var todo = ToDoTestData.GetDefault(ownerMock.Object);

        // Act & Assert
        await Assert.ThrowsAsync<ArgumentNullException>(() => todo.UpdateFromDataAsync(null!));
        ownerMock.Verify(owner => owner.SaveAsync(It.IsAny<IToDo>()), Times.Never);
    }

    [Fact]
    public void GetData_ReturnsCorrectDto()
    {
        // Arrange
        var now = DateTimeOffset.Now;
        
        var todo = new ToDo
        {
            Id = Guid.NewGuid(),
            Title = "Task",
            Description = "Desc",
            CompletionDatePlanned = now.AddDays(-1),
            CompletionDateActual = now,
            State = ToDoState.GetState(ToDoStateType.Completed)
        };
    
        // Act
        var dto = todo.GetData();
    
        // Assert
        Assert.Equal(todo.Id, dto.Id);
        Assert.Equal(todo.Title, dto.Title);
        Assert.Equal(todo.Description, dto.Description);
        Assert.Equal(todo.CompletionDatePlanned, dto.CompletionDatePlanned);
        Assert.Equal(todo.CompletionDateActual, dto.CompletionDateActual);
        Assert.Equal(todo.State.Type, dto.State);
    }

    public static IEnumerable<object[]> GetUpdateFieldsTestData()
    {
        var now = DateTimeOffset.Now;

        // Сценарий: обновляется только Title
        yield return
        [
            new ToDoUpdateDto
            {
                Title = "Updated Title",
            },
        ];

        // Сценарий: обновляется только Description
        yield return
        [
            new ToDoUpdateDto
            {
                Description = "Updated Description",
            }
        ];

        // Сценарий: обновляется только CompletionDatePlanned
        yield return
        [
            new ToDoUpdateDto
            {
                CompletionDatePlanned = now.AddDays(10)
            }
        ];

        // Сценарий: обновляются все поля
        yield return
        [
            new ToDoUpdateDto
            {
                Title = "Updated Title",
                Description = "Updated Description",
                CompletionDatePlanned = now.AddDays(10)
            }
        ];
    }
}