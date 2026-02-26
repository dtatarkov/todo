using Core.DTO;
using Core.Entities;
using Core.Factories;
using Core.Services;

namespace Tests.Services
{
    public class CompleteToDoServiceTests
    {
        private readonly CompleteToDoService _completeToDoService;
        private readonly ToDoOwnerFactory _todoOwnerFactory;

        public CompleteToDoServiceTests()
        {
            _todoOwnerFactory = new ToDoOwnerFactory();
            _completeToDoService = new CompleteToDoService(_todoOwnerFactory);
        }

        [Fact]
        public async Task CompleteToDoSuccessfullyCompletesExistingToDo()
        {
            var addDto = new ToDoAddDTO
            {
                Title = "Test Task",
                Description = "Description",
                CompletionDatePlanned = DateTimeOffset.Now.AddDays(1)
            };

            var todoOwner = _todoOwnerFactory.Create();
            var todo = await todoOwner.AddToDoAsync(addDto);

            await _completeToDoService.CompleteToDoAsync(todo.Id);

            Assert.True(todo.IsCompleted);
            Assert.NotNull(todo.CompletionDateActual);
        }
        
        [Fact]
        public async Task CompleteToDoThrowsArgumentExceptionForNonExistentId()
        {
            var nonExistentId = Guid.NewGuid();

            await Assert.ThrowsAsync<ArgumentException>(() => 
                _completeToDoService.CompleteToDoAsync(nonExistentId));
        }
        
        [Fact]
        public async Task CompleteToDoThrowsArgumentExceptionForEmptyGuidId()
        {
            var emptyId = Guid.Empty;

            await Assert.ThrowsAsync<ArgumentException>(() => 
                _completeToDoService.CompleteToDoAsync(emptyId));
        }
    }
}