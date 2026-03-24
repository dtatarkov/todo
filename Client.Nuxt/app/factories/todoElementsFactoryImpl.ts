import { ToDoElementsFactory } from "~/interfaces/todoElementsFactory";
import { ToDoCard, type ToDoCardData } from "~/interfaces/todoCard";
import { ToDoCardBase } from "~/entities/todoCardBase";
import type { TodosService } from "~/interfaces/todosService";

export class ToDoElementsFactoryImpl extends ToDoElementsFactory {
  constructor(
    private todosService: TodosService,
  )
  {
    super();
  }
  
  createToDoCard(data?: Partial<ToDoCardData>): ToDoCard
  {
    const card = new ToDoCardBase(this.todosService);
    
    if(data)
    {
      card.setData(data);
    }
    
    return card;
  }  
}