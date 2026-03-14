import { TodosService } from "#shared/interfaces/todosService";
import type { DatesService } from "#shared/interfaces/datesService";
import { ToDoViewModel, ToDoViewModelData } from "#shared/interfaces/todoViewModel";

export class ToDoViewModelImpl extends ToDoViewModel
{
  protected data: ToDoViewModelData = {
    id: '',
    title: '',
    description: '',
    completionDatePlanned: '',
    completionDateActual: ''    
  }

  constructor(
    protected todosService: TodosService,
    protected datesService: DatesService
  )
  {
    super();
  }

  get name() {
    return `todo-${this.data.id}`;
  }
  
  setToDoId(id: string)
  {
    this.setData({
      id: id
    });
  }

  handleEditButtonClick() {
    console.log('edit requested');
  }

  protected async handleInitialization() {
    const todo = await this.todosService.getToDoByIdOrDefaultAsync(this.data.id);
    
    this.setData({
      title: todo.title,
      description: todo.description,
      completionDatePlanned: this.datesService.formatDateOptional(todo.completionDatePlanned),
      completionDateActual: this.datesService.formatDateOptional(todo.completionDateActual)
    });
  }
}