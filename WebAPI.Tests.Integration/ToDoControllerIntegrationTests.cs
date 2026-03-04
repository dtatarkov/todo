using System.Net;
using System.Net.Http.Json;
using Core.DTO;
using Db.Postgre.Context;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace WebAPI.Tests.Integration;

public class ToDoControllerIntegrationTests : IAsyncLifetime
{
    private readonly WebApplicationFactory<Program> _factory;
    private readonly HttpClient _client;

    public ToDoControllerIntegrationTests()
    {
        _factory = new WebApplicationFactory<Program>().WithWebHostBuilder(builder =>
        {
            builder.UseSetting("ASPNETCORE_ENVIRONMENT", "Testing");
        });
        
        _client = _factory.CreateClient();
    }

    [Fact]
    public async Task GetAll_ReturnsEmptyList_WhenNoTodosExist()
    {
        // Act
        var response = await _client.GetAsync("/api/todos");

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var content = await response.Content.ReadFromJsonAsync<ToDoGetDto[]>();
        Assert.NotNull(content);
        Assert.Empty(content);
    }

    [Fact]
    public async Task GetById_ReturnsNotFound_WhenTodoDoesNotExist()
    {
        // Act
        var response = await _client.GetAsync($"/api/todos/{Guid.Empty}");

        // Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task AddToDo_CreatesNewTodo()
    {
        // Arrange
        var todoToAdd = new ToDoAddDto
        {
            Title = "Test Todo",
            Description = "Test Description",
            CompletionDatePlanned = DateTime.Now.AddDays(1)
        };

        // Act
        var response = await _client.PostAsJsonAsync("/api/todos", todoToAdd);
        var newToDo = await response.Content.ReadFromJsonAsync<ToDoGetDto>();

        // Assert
        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        Assert.NotNull(newToDo);
        Assert.NotEqual(newToDo.Id, Guid.Empty);
        Assert.Equal(todoToAdd.Title, newToDo.Title);
        Assert.Equal(todoToAdd.Description, newToDo.Description);
        Assert.Equal(todoToAdd.CompletionDatePlanned, newToDo.CompletionDatePlanned);
    }

    [Fact]
    public async Task UpdateToDo_UpdatesExistingTodo()
    {
        // Arrange
        var todoToAdd = new ToDoAddDto
        {
            Title = "Test Todo",
            Description = "Test Description"
        };

        // Create todo first
        var createResponse = await _client.PostAsJsonAsync("/api/todos", todoToAdd);
        var createdTodo = await createResponse.Content.ReadFromJsonAsync<ToDoGetDto>();

        // Act
        var updateData = new ToDoUpdateDto
        {
            Title = "Updated Title"
        };

        var response = await _client.PutAsJsonAsync($"/api/todos/{createdTodo!.Id}", updateData);
        var updatedTodo = await response.Content.ReadFromJsonAsync<ToDoGetDto>();

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.NotNull(updatedTodo);
        Assert.Equal(updatedTodo.Title, updateData.Title);
    }

    [Fact]
    public async Task DeleteToDo_RemovesTodo()
    {
        // Arrange
        var todoToAdd = new ToDoAddDto
        {
            Title = "Test Todo",
            Description = "Test Description"
        };

        // Create todo first
        var createResponse = await _client.PostAsJsonAsync("/api/todos", todoToAdd);
        var createdTodo = await createResponse.Content.ReadFromJsonAsync<ToDoGetDto>();

        // Act
        var response = await _client.DeleteAsync($"/api/todos/{createdTodo!.Id}");

        // Assert
        Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
    }

    [Fact]
    public async Task CompleteToDo_CompletesTodo()
    {
        // Arrange
        var todoToAdd = new ToDoAddDto
        {
            Title = "Test Todo",
            Description = "Test Description"
        };

        // Create todo first
        var createResponse = await _client.PostAsJsonAsync("/api/todos", todoToAdd);
        var createdTodo = await createResponse.Content.ReadFromJsonAsync<ToDoGetDto>();

        // Act
        var response = await _client.PostAsync($"/api/todos/{createdTodo!.Id}/complete", null);

        // Assert
        Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
    }

    public async Task InitializeAsync()
    {
        ApplyMigrations();
    }

    public async Task DisposeAsync()
    {
        using var scope = _factory.Services.CreateScope();

        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        await context.ToDos.ExecuteDeleteAsync();
        
        _client.Dispose();
        await _factory.DisposeAsync();
    }
    
    private void ApplyMigrations()
    {
        using var scope = _factory.Services.CreateScope();
        
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        context.Database.Migrate();
    }
}
