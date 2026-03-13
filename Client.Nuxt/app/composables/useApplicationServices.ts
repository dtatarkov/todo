import { DatesServiceImpl } from "#shared/services/datesServiceImpl";
import { DatesService } from "#shared/interfaces/datesService";
import { TodosService } from "#shared/interfaces/todosService";
import { TodosServiceImpl } from "#shared/services/todosServiceImpl";

export function useApplicationServices()
{
  registerService(DatesService, DatesServiceImpl);
  registerService(TodosService, TodosServiceImpl);
}