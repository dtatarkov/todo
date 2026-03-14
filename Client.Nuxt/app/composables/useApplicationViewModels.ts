import { TodosViewModel } from "#shared/interfaces/todosViewModel";
import { TodosViewModelImpl } from "#shared/viewmodels/todosViewModelImpl";
import { registerServiceFactory } from "~/utils/serviceUtils";
import { TodosService } from "#shared/interfaces/todosService";
import { DatesService } from "#shared/interfaces/datesService";

export function useApplicationViewModels()
{
  registerServiceFactory(TodosViewModel, () =>
  {
    const todosService = getService(TodosService);
    const datesService = getService(DatesService);
    const viewmodel    = new TodosViewModelImpl(todosService, datesService);

    return viewmodel;
  });
}