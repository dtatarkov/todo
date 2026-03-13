import { TodosViewModel } from "#shared/interfaces/todosViewModel";
import { TodosViewModelImpl } from "#shared/viewmodels/todosViewModelImpl";
import { registerServiceFactory } from "~/utils/serviceUtils";
import { TodosService } from "#shared/interfaces/todosService";

export function useApplicationViewModels()
{
  registerServiceFactory(TodosViewModel, () =>
  {
    const todosService = getService(TodosService);
    const viewmodel    = new TodosViewModelImpl(todosService);

    return viewmodel;
  });
}