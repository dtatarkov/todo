import { TodosViewModel } from "#shared/interfaces/todosViewModel";
import { ToDo } from "#shared/interfaces/todo";
import { TodosService } from "#shared/interfaces/todosService";

export class TodosViewModelImpl extends TodosViewModel
{
  protected data = {
    todos: new Array<ToDo>()
  }

  constructor(protected todosService: TodosService)
  {
    super();
  }
  
  protected async handleInitialization() {
    const todos = await this.todosService.getAllToDosAsync();
    
    this.setData({
      todos
    });
  }
}