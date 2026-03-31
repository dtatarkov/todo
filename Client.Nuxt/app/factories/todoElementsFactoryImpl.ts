import { ToDoElementsFactory } from "~/interfaces/todoElementsFactory";
import { ToDoCard } from "~/interfaces/todoCard";
import { ToDoCardBase } from "~/entities/todoCardBase";
import type { ToDosService } from "~/interfaces/todosService";
import type { ToDo } from "~/interfaces/todo";

export class ToDoElementsFactoryImpl extends ToDoElementsFactory
{
  constructor(
    private todosService: ToDosService,
    private datesService: DatesService
  )
  {
    super();
  }

  createToDoCard(todo: ToDo): ToDoCard
  {
    const card = new ToDoCardBase(this.todosService);

    updatePropertiesWithData(card, {
      ...todo.getData(),

      completionDatePlanned: this.datesService.formatDateOptional(todo.completionDatePlanned),
      completionDateActual : this.datesService.formatDateOptional(todo.completionDateActual)
    });

    return card;
  }
}