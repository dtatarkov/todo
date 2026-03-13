import { DatesServiceImpl } from "#shared/services/datesServiceImpl";
import { DatesService } from "#shared/interfaces/datesService";
import { TodosService } from "#shared/interfaces/todosService";
import { TodosServiceImpl } from "#shared/services/todosServiceImpl";
import { TodosOwner } from "#shared/interfaces/todosOwner";
import { TodosOwnerBase } from "#shared/entities/todosOwnerBase";

export function useApplicationServices()
{
  registerService(DatesService, DatesServiceImpl);  
  registerService(TodosOwner, TodosOwnerBase);

  registerServiceFactory(TodosService,() =>
  {
    const todosOwner = getService(TodosOwner);
    const todosService = new TodosServiceImpl(todosOwner);
    
    return todosService;
  });
}