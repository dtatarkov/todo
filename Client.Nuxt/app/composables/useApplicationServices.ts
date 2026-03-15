import { DatesServiceImpl } from "#shared/services/datesServiceImpl";
import { DatesService } from "#shared/interfaces/datesService";
import { TodosService } from "#shared/interfaces/todosService";
import { TodosServiceImpl } from "#shared/services/todosServiceImpl";
import { ToDosOwner } from "#shared/interfaces/todosOwner";
import { ToDosOwnerBase } from "#shared/entities/todosOwnerBase";
import { ToDosRepository } from "#shared/interfaces/todosRepository";
import { ToDosRepositoryImpl } from "#shared/repositories/todosRepositoryImpl";
import { ToDoDtoMapperImpl } from "#shared/mappers/todoDtoMapperImpl";
import { ToDoDtoMapper } from "#shared/interfaces/todoDtoMapper";
import { TodosViewModel } from "#shared/interfaces/todosViewModel";
import { TodosViewModelImpl } from "#shared/viewmodels/todosViewModelImpl";
import { ToDoViewModel } from "#shared/interfaces/todoViewModel";
import { ToDoViewModelImpl } from "#shared/viewmodels/todoViewModelImpl";
import { OverlayViewModel } from "#shared/interfaces/overlayViewModel";
import { OverlayViewModelImpl } from "#shared/viewmodels/overlayViewModelImpl";

export function useApplicationServices()
{
  registerService(DatesService, DatesServiceImpl);
  registerService(ToDosRepository, ToDosRepositoryImpl);

  registerServiceFactory(ToDoDtoMapper, () =>
  {
    const datesService = getService(DatesService);
    const mapper       = new ToDoDtoMapperImpl(datesService);

    return mapper;
  });

  registerServiceFactory(ToDosOwner, () =>
  {
    const todosRepository = getService(ToDosRepository);
    const todoDtoMapper   = getService(ToDoDtoMapper);
    const todoOwner       = new ToDosOwnerBase(todosRepository, todoDtoMapper);

    return todoOwner;
  });

  registerServiceFactory(TodosService, () =>
  {
    const todosOwner   = getService(ToDosOwner);
    const todosService = new TodosServiceImpl(todosOwner);

    return todosService;
  });

  registerServiceFactory(TodosViewModel, () =>
  {
    const todosService = getService(TodosService);
    const viewmodel    = new TodosViewModelImpl(todosService);

    return viewmodel;
  });

  registerServiceFactory(ToDoViewModel, () =>
  {
    const todosService = getService(TodosService);
    const datesService = getService(DatesService);
    const viewmodel    = new ToDoViewModelImpl(todosService, datesService);

    return viewmodel;
  });

  registerServiceFactory(OverlayViewModel, () =>
  {
    const viewmodel = new OverlayViewModelImpl();

    return viewmodel;
  });
}