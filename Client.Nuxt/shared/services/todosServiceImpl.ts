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

  async getToDoByIdAsync(todoId: string): Promise<ToDo | undefined>
  {
    await this.owner.init();
    let todo = this.owner.getToDoById(todoId);
    
    return todo;
  }

  async getToDoByIdOrDefaultAsync(todoId: string): Promise<ToDo>
  {
    let todo = await this.getToDoByIdAsync(todoId);

    if (!todo)
    {
      todo = new ToDoBase();
    }

    return todo;
  }

  async editToDoAsync(todoId: string): Promise<void> {
    let todo = await this.getToDoByIdAsync(todoId);
    
    if(!todo)
    {
      throw new Error(`ToDo(${todoId}) not found`);
    }
    
    
  }
}