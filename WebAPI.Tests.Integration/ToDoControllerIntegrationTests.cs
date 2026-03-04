using System.Net;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using Core.DTO;
using Db.Postgre.Context;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace WebAPI.Tests.Integration;

public class ToDoControllerIntegrationTests : IAsyncDisposable
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
        
        ApplyMigrations();
    }

    [Fact]
    public async Task GetAll_ReturnsEmptyList_WhenNoTodosExist()
    {
        // Act
        var response = await _client.GetAsync("/api/todos");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var content = await response.Content.ReadAsStringAsync();
        content.Should().NotBeNullOrEmpty();
    }

    [Fact]
    public async Task GetById_ReturnsNotFound_WhenTodoDoesNotExist()
    {
        // Act
        var response = await _client.GetAsync($"/api/todos/{Guid.Empty}");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }

    [Fact]
    public async Task AddToDo_CreatesNewTodo()
    {
        // Arrange
        var todoToAdd = new ToDoAddDto
        {
            Title = "Test Todo",
            Description = "Test Description"
        };

        var json = JsonSerializer.Serialize(todoToAdd);
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        // Act
        var response = await _client.PostAsync("/api/todos", content);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.Created);
        var responseContent = await response.Content.ReadAsStringAsync();
        responseContent.Should().NotBeNullOrEmpty();
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

        var json = JsonSerializer.Serialize(todoToAdd);
        var content = new StringContent(json, Encoding.UTF8, "application/json");
        var createResponse = await _client.PostAsync("/api/todos", content);
        var createdTodo = await createResponse.Content.ReadFromJsonAsync<ToDoGetDto>();

        // Act
        var updateData = new ToDoUpdateDto
        {
            Title = "Updated Title"
        };

        var updateJson = JsonSerializer.Serialize(updateData);
        var updateContent = new StringContent(updateJson, Encoding.UTF8, "application/json");

        var response = await _client.PutAsync($"/api/todos/{createdTodo!.Id}", updateContent);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.NoContent);
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

        var json = JsonSerializer.Serialize(todoToAdd);
        var content = new StringContent(json, Encoding.UTF8, "application/json");
        var createResponse = await _client.PostAsync("/api/todos", content);
        var createdTodo = await createResponse.Content.ReadFromJsonAsync<ToDoGetDto>();

        // Act
        var response = await _client.DeleteAsync($"/api/todos/{createdTodo!.Id}");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.NoContent);
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

        var json = JsonSerializer.Serialize(todoToAdd);
        var content = new StringContent(json, Encoding.UTF8, "application/json");
        var createResponse = await _client.PostAsync("/api/todos", content);
        var createdTodo = await createResponse.Content.ReadFromJsonAsync<ToDoGetDto>();

        // Act
        var response = await _client.PostAsync($"/api/todos/{createdTodo!.Id}/complete", null);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.NoContent);
    }

    public async ValueTask DisposeAsync()
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