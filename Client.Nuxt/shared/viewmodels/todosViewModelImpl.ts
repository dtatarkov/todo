import { TodosViewModel, type TodosViewModelToDoData } from "#shared/interfaces/todosViewModel";
import { TodosService } from "#shared/interfaces/todosService";

export class TodosViewModelImpl extends TodosViewModel
{
  readonly name = 'todos';
  
  protected data = {
    todos: new Array<TodosViewModelToDoData>()
  }

  constructor(protected todosService: TodosService)
  {
    super();
  }
  
  protected override async handleInitialization() {
    await super.handleInitialization();
    
    const todos = await this.todosService.getAllToDosAsync();
    
    const todosData = todos.map<TodosViewModelToDoData>(todo => ({
      id: todo.id,
    }));
    
    this.setData({
      todos: todosData
    });
  }
}