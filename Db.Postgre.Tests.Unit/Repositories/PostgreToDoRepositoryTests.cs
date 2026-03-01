using Core.Entities;
using Core.Enums;
using Core.Exceptions;
using Db.Postgre.Context;
using Db.Postgre.Entities;
using Db.Postgre.Mappers;
using Db.Postgre.Repositories;
using Microsoft.EntityFrameworkCore;
using Moq;

namespace Db.Postgre.Tests.Unit.Repositories;

public class PostgreToDoRepositoryTests
{
    private readonly Mock<IToDoEntityMapper> _mapperMock = CreateMapperMock();

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
                Title = "Finished Task",
                Description = "Done with success",
                CompletionDatePlanned = now.AddDays(-2),
                CompletionDateActual = now,
                State = ToDoState.GetState(ToDoStateType.Completed)
            },
        ];
    }

    [Fact]
    public async Task SaveAsync_WhenTodoHasEmptyId_ShouldInsertAndSetId()
    {
        // Arrange
        var todoToAdd = new ToDo();
        var context = CreateDbContext();
        var repository = new PostgreToDoRepository(context, _mapperMock.Object);
        
        await repository.SaveAsync(todoToAdd);
        
        // Act
        var entityDb = await context.ToDos.FindAsync(todoToAdd.Id);

        // Assert
        Assert.NotEqual(Guid.Empty, todoToAdd.Id);
        Assert.NotNull(entityDb);
        Assert.Equal(todoToAdd.Id, entityDb.Id);
    }

    [Theory]
    [MemberData(nameof(GetValidToDoTestCases))]
    public async Task SaveAsync_UpdatesExistingTodo_WithValidData(IToDo todoToUpdate)
    {
        // Arrange
        var existingEntity = new PostgreToDoEntity
        {
            Id = Guid.NewGuid(),
        };

        todoToUpdate.Id = existingEntity.Id;

        var context = CreateDbContext();
        await context.ToDos.AddAsync(existingEntity);
        await context.SaveChangesAsync();

        var repository = new PostgreToDoRepository(context, _mapperMock.Object);

        // Act
        await repository.SaveAsync(todoToUpdate);

        // Assert
        var entityInDb = await context.ToDos.FindAsync(todoToUpdate.Id);
        
        Assert.NotNull(entityInDb);
        Assert.Equal(todoToUpdate.Title, entityInDb.Title);
        Assert.Equal(todoToUpdate.Description, entityInDb.Description);
        Assert.Equal(todoToUpdate.CompletionDatePlanned, entityInDb.CompletionDatePlanned);
        Assert.Equal(todoToUpdate.CompletionDateActual, entityInDb.CompletionDateActual);
        Assert.Equal(todoToUpdate.State.Type, entityInDb.StateType);
    }

    [Fact]
    public async Task SaveAsync_WhenTodoIsNull_ShouldThrowArgumentNullException()
    {
        // Arrange
        var context = CreateDbContext();
        var repository = new PostgreToDoRepository(context, _mapperMock.Object);

        // Act & Assert
        await Assert.ThrowsAsync<ArgumentNullException>(() => repository.SaveAsync(null!));
    }

    [Fact]
    public async Task GetByIdAsync_ExistingId_ShouldReturnMappedTodo()
    {
        // Arrange
        var entityExisting = new PostgreToDoEntity
        {
            Id = Guid.NewGuid(),
        };

        var dbContext = CreateDbContext();
        await dbContext.ToDos.AddAsync(entityExisting);
        await dbContext.SaveChangesAsync();

        var repository = new PostgreToDoRepository(dbContext, _mapperMock.Object);

        var entityLoaded = await repository.GetByIdAsync(entityExisting.Id);

        Assert.NotNull(entityLoaded);
        Assert.Equal(entityExisting.Id, entityLoaded.Id);
    }

    [Fact]
    public async Task GetByIdAsync_NonExistingId_ShouldReturnNull()
    {
        // Arrange
        var nonExistingId = Guid.NewGuid();
        var context = CreateDbContext();
        var repository = new PostgreToDoRepository(context, _mapperMock.Object);

        // Act
        var result = await repository.GetByIdAsync(nonExistingId);

        // Assert
        Assert.Null(result);
    }

    [Fact]
    public async Task GetByIdAsync_EmptyId_ShouldReturnNull()
    {
        var context = CreateDbContext();
        var repository = new PostgreToDoRepository(context, _mapperMock.Object);

        var result = await repository.GetByIdAsync(Guid.Empty);

        Assert.Null(result);
    }

    [Fact]
    public async Task GetAllAsync_WithItems_ShouldReturnAllMappedTodos()
    {
        var entity1 = new PostgreToDoEntity
        {
            Id = Guid.NewGuid(),
        };
        var entity2 = new PostgreToDoEntity
        {
            Id = Guid.NewGuid(),
        };

        var context = CreateDbContext();
        context.ToDos.Add(entity1);
        context.ToDos.Add(entity2);
        await context.SaveChangesAsync();

        var repository = new PostgreToDoRepository(context, _mapperMock.Object);

        var result = await repository.GetAllAsync();

        var list = result.ToList();
        Assert.Equal(2, list.Count);
        Assert.Contains(list, t => t.Id == entity1.Id);
        Assert.Contains(list, t => t.Id == entity2.Id);
    }

    [Fact]
    public async Task RemoveAsync_ExistingId_ShouldDeleteEntityFromDatabase()
    {
        // Arrange
        var entity = new PostgreToDoEntity
        {
            Id = Guid.NewGuid()
        };
        
        var context = CreateDbContext();
        await context.ToDos.AddAsync(entity);
        await context.SaveChangesAsync();

        var repository = new PostgreToDoRepository(context, _mapperMock.Object);

        // Act
        await repository.RemoveAsync(entity.Id);

        // Assert
        var deletedEntity = await context.ToDos.FindAsync(entity.Id);
        Assert.Null(deletedEntity);
    }

    [Fact]
    public async Task RemoveAsync_NonExistingId_ShouldThrowEntityNotFoundException()
    {
        // Arrange
        var context = CreateDbContext();
        var repository = new PostgreToDoRepository(context, _mapperMock.Object);
        var nonExistentId = Guid.NewGuid();

        // Act & Assert
        await Assert.ThrowsAsync<EntityNotFoundException>(() => repository.RemoveAsync(nonExistentId));
    }

    [Fact]
    public async Task RemoveAsync_EmptyId_ShouldThrowEntityNotFoundException()
    {
        // Arrange
        var context = CreateDbContext();
        var repository = new PostgreToDoRepository(context, _mapperMock.Object);

        // Act & Assert
        await Assert.ThrowsAsync<EntityNotFoundException>(() => repository.RemoveAsync(Guid.Empty));
    }

    /// <summary>
    /// Создаёт новый экземпляр AppDbContext с in-memory базой данных.
    /// Каждый вызов — изолированная база.
    /// </summary>
    private static AppDbContext CreateDbContext()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: $"TestDb_{Guid.NewGuid()}")
            .Options;

        return new AppDbContext(options);
    }

    /// <summary>
    /// Создаёт и настраивает мок IToDoEntityMapper.
    /// </summary>
    private static Mock<IToDoEntityMapper> CreateMapperMock()
    {
        var mapperMock = new Mock<IToDoEntityMapper>();

        mapperMock
            .Setup(m => m.ToEntity(It.IsAny<IToDo>()))
            .Returns((IToDo todo) => new PostgreToDoEntity
            {
                Id = Guid.NewGuid(),
                Title = todo.Title,
                Description = todo.Description
            });

        mapperMock
            .Setup(m => m.ToDomainModel(It.IsAny<PostgreToDoEntity>()))
            .Returns((PostgreToDoEntity entity) => new ToDo
            {
                Id = entity.Id,
                Title = entity.Title,
                Description = entity.Description
            });

        return mapperMock;
    }
}