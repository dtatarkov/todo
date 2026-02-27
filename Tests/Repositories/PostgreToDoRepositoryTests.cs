using Core.Entities;
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