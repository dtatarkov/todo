import { DatesServiceImpl } from "#shared/services/datesServiceImpl";
import { DatesService } from "#shared/interfaces/datesService";
import { TodosService } from "#shared/interfaces/todosService";
import { TodosServiceImpl } from "#shared/services/todosServiceImpl";
import { ToDosOwner } from "#shared/interfaces/todosOwner";
import { ToDosOwnerBase } from "#shared/entities/todosOwnerBase";

export function useApplicationServices()
{
  registerService(DatesService, DatesServiceImpl);  
  registerService(ToDosOwner, ToDosOwnerBase);

  registerServiceFactory(TodosService,() =>
  {
    const todosOwner = getService(ToDosOwner);
    const todosService = new TodosServiceImpl(todosOwner);
    
    return todosService;
  });
}