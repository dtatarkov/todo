import { TodosService } from "#shared/interfaces/todosService";
import { ToDo } from "#shared/interfaces/todo";
import type { ToDosOwner } from "#shared/interfaces/todosOwner";
import { ToDoBase } from "#shared/entities/todoBase";

export class TodosServiceImpl extends TodosService
{
  constructor(protected owner: ToDosOwner)
  {
    super();
  }

  async getAllToDosAsync(): Promise<ToDo[]>
  {
    await this.owner.init();
    const todos = this.owner.getAllToDos();

    return todos;
  }

  async getToDoByIdOrDefaultAsync(id: string): Promise<ToDo>
  {
    await this.owner.init();
    let todo = this.owner.getToDoById(id);

    if (!todo)
    {
      todo = new ToDoBase();
    }

    return todo;
  }
}