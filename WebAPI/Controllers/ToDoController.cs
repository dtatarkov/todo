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
    [HttpGet("{id:guid}")]
    [ProducesResponseType(typeof(ToDoGetDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ToDoGetDto?>> GetById(Guid id)
    {
        var todo = await toDoService.GetToDoByIdAsync(id);

        if (todo == null)
        {
            return NotFound(new { message = $"ToDo with ID {id} not found." });
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
    [HttpPut]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateToDo([FromBody] ToDoUpdateDto data)
    {
        await toDoService.UpdateToDoAsync(data);
        return NoContent();
    }

    /// <summary>
    /// Удаляет задачу по идентификатору.
    /// </summary>
    [HttpDelete("{id:guid}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteToDo(Guid id)
    {
        await toDoService.RemoveToDoAsync(id);
        return NoContent();
    }

    /// <summary>
    /// Завершает задачу.
    /// </summary>
    [HttpPost("{id:guid}/complete")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> CompleteToDo(Guid id)
    {
        await toDoService.CompleteToDoAsync(id);
        return NoContent();
    }
}