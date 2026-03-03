using Core.DTO;
using Core.Services;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/todos")]
public class ToDoController(IToDoService toDoService) : ControllerBase
{
    /// <summary>
    /// Добавляет новую задачу.
    /// </summary>
    [HttpPost]
    [ProducesResponseType(typeof(ToDoGetDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<ToDoGetDto>> AddToDo([FromBody] ToDoAddDto data)
    {
        var todo = await toDoService.AddToDoAsync(data);
            
        return CreatedAtAction(nameof(GetById), new { id = todo.Id }, todo);
    }

    /// <summary>
    /// Получает задачу по идентификатору.
    /// </summary>
    [HttpGet("{todoId:guid}")]
    [ProducesResponseType(typeof(ToDoGetDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ToDoGetDto?>> GetById(Guid todoId)
    {
        var todo = await toDoService.GetToDoByIdAsync(todoId);

        if (todo == null)
        {
            return NotFound(new { message = $"ToDo with ID {todoId} not found." });
        }

        return Ok(todo);
    }

    /// <summary>
    /// Возвращает список всех задач.
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<ToDoGetDto>), StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<ToDoGetDto>>> GetAll()
    {
        var todos = await toDoService.GetAllToDosAsync();
        return Ok(todos);
    }

    /// <summary>
    /// Обновляет существующую задачу.
    /// </summary>
    [HttpPut("{todoId:guid}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateToDo(Guid todoId, [FromBody] ToDoUpdateDto data)
    {
        await toDoService.UpdateToDoAsync(todoId, data);
        return NoContent();
    }

    /// <summary>
    /// Удаляет задачу по идентификатору.
    /// </summary>
    [HttpDelete("{todoId:guid}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteToDo(Guid todoId)
    {
        await toDoService.RemoveToDoAsync(todoId);
        return NoContent();
    }

    /// <summary>
    /// Завершает задачу.
    /// </summary>
    [HttpPost("{todoId:guid}/complete")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> CompleteToDo(Guid todoId)
    {
        await toDoService.CompleteToDoAsync(todoId);
        return NoContent();
    }
}