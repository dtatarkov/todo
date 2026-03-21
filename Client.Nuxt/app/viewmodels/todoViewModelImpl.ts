import { TodosService } from "@/interfaces/todosService";
import type { DatesService } from "@/interfaces/datesService";
import { ToDoViewModel, type ToDoViewModelData } from "@/interfaces/todoViewModel";

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
    protected datesService: DatesService,
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

  override async updateData(): Promise<void> {
    await super.updateData();
    
    const todo = await this.todosService.getToDoByIdOrDefaultAsync(this.data.id);

    this.setData({
      title: todo.title,
      description: todo.description,
      completionDatePlanned: this.datesService.formatDateOptional(todo.completionDatePlanned),
      completionDateActual: this.datesService.formatDateOptional(todo.completionDateActual)
    });
  }

  async handleEditButtonClick(): Promise<void>
  {
    await this.todosService.editToDoAsync(this.data.id);
  }
}