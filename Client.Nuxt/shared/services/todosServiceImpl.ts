import { TodosService } from "#shared/interfaces/todosService";
import { ToDo } from "#shared/interfaces/todo";
import type { TodosOwner } from "#shared/interfaces/todosOwner";

export class TodosServiceImpl extends TodosService
{
  constructor(protected owner: TodosOwner)
  {
    super();
  }

  async getAllToDosAsync(): Promise<ToDo[]>
  {
    return this.owner.getAllToDosAsync();
  }
}