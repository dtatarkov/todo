import { ToDoCard, type ToDoCardData } from "~/interfaces/todoCard";
import { WithUIElementBasics } from "~/mixins/withUIElementBasics";
import type { AbstractConstructor } from "~/types/abstractConstructor";
import type { TodosService } from "~/interfaces/todosService";

export class ToDoCardBase extends WithUIElementBasics<ToDoCardData, AbstractConstructor<ToDoCard>>(ToDoCard) {
  name = 'ToDoCardBase';
  
  data: ToDoCardData = {
    id: '',
    title: '',
    description: '',
    completionDatePlanned: '',
    completionDateActual: ''
  }
  
  constructor(
    private todosService: TodosService
  )
  {
    super();
  }
  
  async handleEditButtonClick() {
    await this.todosService.editToDoAsync(this.data.id);
  }
}