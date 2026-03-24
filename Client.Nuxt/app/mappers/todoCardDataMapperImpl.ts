import { ToDoCardDataMapper } from "~/interfaces/todoCardDataMapper";
import type { ToDo } from "~/interfaces/todo";
import type { ToDoCardData } from "~/interfaces/todoCard";
import type { DatesService } from "~/interfaces/datesService";

export class ToDoCardDataMapperImpl extends ToDoCardDataMapper {
  constructor(
    private datesService: DatesService
  )
  {
    super();
  }
  
  map(todo: ToDo): ToDoCardData
  {
    return {
      id: todo.id,
      title: todo.title,
      description: todo.description,
      completionDatePlanned: this.datesService.formatDateOptional(todo.completionDatePlanned),
      completionDateActual: this.datesService.formatDateOptional(todo.completionDateActual)
    };
  }
}