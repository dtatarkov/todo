import { TodosViewModel, type TodosViewModelToDoData } from "#shared/interfaces/todosViewModel";
import { TodosService } from "#shared/interfaces/todosService";
import type { DatesService } from "#shared/interfaces/datesService";

export class TodosViewModelImpl extends TodosViewModel
{
  readonly name = 'todos';
  
  protected data = {
    todos: new Array<TodosViewModelToDoData>()
  }

  constructor(
    protected todosService: TodosService,
    protected datesService: DatesService
  )
  {
    super();
  }
  
  protected async handleInitialization() {
    const todos = await this.todosService.getAllToDosAsync();
    
    const todosData = todos.map<TodosViewModelToDoData>(todo => ({
      id: todo.id,
      title: todo.title,
      description: todo.description,
      completionDatePlanned: this.datesService.formatDateOptional(todo.completionDatePlanned),
      completionDateActual: this.datesService.formatDateOptional(todo.completionDateActual)
    }));
    
    this.setData({
      todos: todosData
    });
  }
}