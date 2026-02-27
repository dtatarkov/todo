using Core.Entities;
using Core.Factories;
using Core.Services;
using Moq;

namespace Tests.Services;

public class CompleteToDoServiceTests
{
    private readonly CompleteToDoService _completeToDoService;
    private readonly Mock<IToDoOwner> _ownerMock;

    public CompleteToDoServiceTests()
    {
        _ownerMock = new Mock<IToDoOwner>();

        var ownerFactoryMock = new Mock<IToDoOwnerFactory>();
        ownerFactoryMock.Setup(f => f.Create()).Returns(_ownerMock.Object);

        _completeToDoService = new CompleteToDoService(ownerFactoryMock.Object);
    }

    [Fact]
    public async Task CompleteToDoSuccessfullyCompletesExistingToDo()
    {
        var existingTodo = new ToDo
        {
            Id = Guid.NewGuid(),
            State = ToDoStateInitial.Instance
        };

        _ownerMock.Setup(o => o.GetToDoByIdAsync(existingTodo.Id))
            .ReturnsAsync(existingTodo);

        await _completeToDoService.CompleteToDoAsync(existingTodo.Id);

        Assert.True(existingTodo.IsCompleted);
        Assert.NotNull(existingTodo.CompletionDateActual);
        Assert.True(existingTodo.CompletionDateActual <= DateTimeOffset.Now);
    }

    [Fact]
    public async Task CompleteToDoThrowsArgumentExceptionForNonExistentId()
    {
        var nonExistentId = Guid.NewGuid();

        _ownerMock.Setup(o => o.GetToDoByIdAsync(nonExistentId))
            .ReturnsAsync((IToDo?)null);

        await Assert.ThrowsAsync<ArgumentException>(() =>
            _completeToDoService.CompleteToDoAsync(nonExistentId));
    }

    [Fact]
    public async Task CompleteToDoThrowsArgumentExceptionForEmptyGuidId()
    {
        var emptyId = Guid.Empty;

        await Assert.ThrowsAsync<ArgumentException>(() =>
            _completeToDoService.CompleteToDoAsync(emptyId));

        _ownerMock.Verify(o => o.GetToDoByIdAsync(emptyId), Times.Never);
    }
}