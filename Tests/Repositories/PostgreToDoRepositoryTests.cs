using Core.Entities;
using Core.Enums;
using Db.Postgre.Context;
using Db.Postgre.Entities;
using Db.Postgre.Mappers;
using Db.Postgre.Repositories;
using Microsoft.EntityFrameworkCore;
using Moq;

namespace Tests.Repositories;

public class PostgreToDoRepositoryTests
{
    private readonly Mock<IToDoEntityMapper> _mapperMock;

    public PostgreToDoRepositoryTests()
    {
        _mapperMock = CreateMapperMock();
    }

    [Fact]
    public async Task AddAsync_WhenTodoHasEmptyId_ShouldSaveAndSetId()
    {
        // Arrange
        var todoToAdd = new ToDo
        {
            Id = Guid.Empty,
            Title = "Test",
            Description = "Desc"
        };

        var dbContext = CreateDbContext();
        var repository = new PostgreToDoRepository(dbContext, _mapperMock.Object);

        // Act
        await repository.AddAsync(todoToAdd);

        Assert.NotEqual(todoToAdd.Id, Guid.Empty);

        // Assert
        var savedEntity = await dbContext.ToDos.FirstOrDefaultAsync(todo => todo.Id == todoToAdd.Id);
        Assert.NotNull(savedEntity);
    }

    [Fact]
    public async Task AddAsync_WhenTodoHasDefinedId_ShouldThrowInvalidOperationException()
    {
        // Arrange
        var todo = new ToDo
        {
            Id = Guid.NewGuid(),
        };

        var dbContext = CreateDbContext();
        var repository = new PostgreToDoRepository(dbContext, _mapperMock.Object);

        // Act & Assert
        await Assert.ThrowsAsync<InvalidOperationException>(() => repository.AddAsync(todo));
    }

    [Fact]
    public async Task GetByIdAsync_ExistingId_ShouldReturnMappedTodo()
    {
        // Arrange
        var entityNew = new PostgreToDoEntity
        {
            Id = Guid.NewGuid(),
            Title = "Saved",
            Description = "Saved Desc",
            StateType = ToDoStateType.Initial
        };

        var dbContext = CreateDbContext();
        await dbContext.ToDos.AddAsync(entityNew);
        await dbContext.SaveChangesAsync();

        var repository = new PostgreToDoRepository(dbContext, _mapperMock.Object);

        // Act
        var entityLoaded = await repository.GetByIdAsync(entityNew.Id);

        // Assert
        Assert.NotNull(entityLoaded);
        Assert.Equal(entityNew.Id, entityLoaded.Id);
        Assert.Equal(entityNew.Title, entityLoaded.Title);
        Assert.Equal(entityNew.Description, entityLoaded.Description);
        Assert.Equal(entityNew.StateType, entityLoaded.State.Type);
    }

    [Fact]
    public async Task GetByIdAsync_EmptyId_ShouldReturnNull()
    {
        // Arrange
        var context = CreateDbContext();
        var repository = new PostgreToDoRepository(context, _mapperMock.Object);

        // Act
        var result = await repository.GetByIdAsync(Guid.Empty);

        // Assert
        Assert.Null(result);
    }

    [Fact]
    public async Task GetAllAsync_WithItems_ShouldReturnAllMappedTodos()
    {
        // Arrange
        var entity1 = new PostgreToDoEntity
        {
            Id = Guid.NewGuid(),
            Title = "One",
            StateType = ToDoStateType.Initial
        };
        var entity2 = new PostgreToDoEntity
        {
            Id = Guid.NewGuid(),
            Title = "Two",
            StateType = ToDoStateType.Completed
        };

        var context = CreateDbContext();
        context.ToDos.Add(entity1);
        context.ToDos.Add(entity2);
        await context.SaveChangesAsync();

        var repository = new PostgreToDoRepository(context, _mapperMock.Object);

        // Act
        var result = await repository.GetAllAsync();

        // Assert
        var list = result.ToList();
        Assert.Equal(2, list.Count);
        Assert.Contains(list, t => t.Id == entity1.Id && t.Title == "One");
        Assert.Contains(list, t => t.Id == entity2.Id && t.Title == "Two");
    }

    [Fact]
    public async Task UpdateAsync_ExistingTodo_ShouldUpdateEntityInDatabase()
    {
        // Arrange
        var entityExisting = new PostgreToDoEntity
        {
            Id = Guid.NewGuid(),
            Title = "Old",
            Description = "Old Desc",
            StateType = ToDoStateType.Initial
        };

        var todoUpdated = new ToDo
        {
            Id = entityExisting.Id,
            Title = "Updated",
            Description = "New Desc",
            CompletionDatePlanned = DateTimeOffset.Now.AddDays(1),
            CompletionDateActual = DateTimeOffset.Now,
            State = ToDoState.GetState(ToDoStateType.Completed)
        };

        var context = CreateDbContext();
        await context.ToDos.AddAsync(entityExisting);
        await context.SaveChangesAsync();

        var repository = new PostgreToDoRepository(context, _mapperMock.Object);

        await repository.UpdateAsync(todoUpdated);

        // Assert
        var entityDb = await context.ToDos.FindAsync(entityExisting.Id);
        Assert.NotNull(entityDb);
        Assert.Equal(todoUpdated.Title, entityDb.Title);
        Assert.Equal(todoUpdated.Description, entityDb.Description);
        Assert.Equal(ToDoStateType.Completed, entityDb.StateType);
    }

    [Fact]
    public async Task UpdateAsync_NullTodo_ShouldThrowArgumentNullException()
    {
        // Arrange
        var context = CreateDbContext();
        var repository = new PostgreToDoRepository(context, _mapperMock.Object);

        // Act & Assert
        await Assert.ThrowsAsync<ArgumentNullException>(() => repository.UpdateAsync(null!));
    }

    [Fact]
    public async Task UpdateAsync_NonExistingTodoId_ShouldThrowInvalidOperationException()
    {
        // Arrange
        var todo = new ToDo
        {
            Id = Guid.NewGuid(), // ID, которого точно нет в БД
        };

        var context = CreateDbContext();
        var repository = new PostgreToDoRepository(context, _mapperMock.Object);

        // Act & Assert
        await Assert.ThrowsAsync<InvalidOperationException>(() => repository.UpdateAsync(todo));
    }

    [Fact]
    public async Task RemoveAsync_ExistingId_ShouldDeleteEntityFromDatabase()
    {
        var entity = new PostgreToDoEntity
        {
            Id = Guid.NewGuid()
        };

        var todo = new ToDo
        {
            Id = entity.Id
        };

        var context = CreateDbContext();
        await context.ToDos.AddAsync(entity);
        await context.SaveChangesAsync();

        var repository = new PostgreToDoRepository(context, _mapperMock.Object);

        // Act
        await repository.RemoveAsync(todo);

        // Assert
        var deletedEntity = await context.ToDos.FindAsync(entity.Id);
        Assert.Null(deletedEntity);
    }

    [Fact]
    public async Task RemoveAsync_NonExistingId_ShouldThrowInvalidOperationException()
    {
        var context = CreateDbContext();
        var repository = new PostgreToDoRepository(context, _mapperMock.Object);

        var todo = new ToDo
        {
            Id = Guid.NewGuid(),
        };

        await Assert.ThrowsAsync<InvalidOperationException>(() => repository.RemoveAsync(todo));
    }

    [Fact]
    public async Task RemoveAsync_EmptyId_ShouldThrowInvalidOperationException()
    {
        var context = CreateDbContext();
        var repository = new PostgreToDoRepository(context, _mapperMock.Object);
        
        var todo = new ToDo
        {
            Id = Guid.Empty,
        };

        await Assert.ThrowsAsync<InvalidOperationException>(() => repository.RemoveAsync(todo));
    }

    /// <summary>
    /// Создаёт новый экземпляр AppDbContext с in-memory базой данных.
    /// Каждый вызов — изолированная база.
    /// </summary>
    private AppDbContext CreateDbContext()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: $"TestDb_{Guid.NewGuid()}")
            .Options;

        return new AppDbContext(options);
    }

    /// <summary>
    /// Создаёт и настраивает мок IToDoEntityMapper.
    /// </summary>
    private Mock<IToDoEntityMapper> CreateMapperMock()
    {
        var mapperMock = new Mock<IToDoEntityMapper>();

        mapperMock.Setup(m => m.ToEntity(It.IsAny<IToDo>()))
            .Returns((IToDo todo) => new PostgreToDoEntity
            {
                Id = Guid.NewGuid(),
                Title = todo.Title,
                Description = todo.Description
            });

        mapperMock.Setup(m => m.ToDomainModel(It.IsAny<PostgreToDoEntity>()))
            .Returns((PostgreToDoEntity entity) => new ToDo
            {
                Id = entity.Id,
                Title = entity.Title,
                Description = entity.Description
            });

        return mapperMock;
    }
}