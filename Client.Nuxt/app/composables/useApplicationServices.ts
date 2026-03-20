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
import { OverlayServiceImpl } from "#shared/services/overlayServiceImpl";
import { OverlayService } from "#shared/interfaces/overlayService";
import { OverlayBase } from "#shared/entities/overlay/overlayBase";
import { Overlay } from "#shared/interfaces/overlay";
import { ServiceScope } from "#shared/enums/serviceScope";
import { FormElementFactory } from "#shared/interfaces/formElementFactory";
import { FormElementFactoryImpl } from "#shared/factories/formElementFactoryImpl";
import { FormFactory } from "#shared/interfaces/formFactory";
import { FormFactoryImpl } from "#shared/factories/formFactoryImpl";

export function useApplicationServices()
{
  registerService(DatesService, DatesServiceImpl, ServiceScope.Singleton);
  registerService(ToDosRepository, ToDosRepositoryImpl, ServiceScope.Singleton);
  registerService(Overlay, OverlayBase, ServiceScope.Singleton);

  registerServiceFactory(ToDoDtoMapper, () =>
  {
    const datesService = getService(DatesService);
    const mapper       = new ToDoDtoMapperImpl(datesService);

    return mapper;
  }, ServiceScope.Singleton);

  registerServiceFactory(ToDosOwner, () =>
  {
    const todosRepository = getService(ToDosRepository);
    const todoDtoMapper   = getService(ToDoDtoMapper);
    const todoOwner       = new ToDosOwnerBase(todosRepository, todoDtoMapper);

    return todoOwner;
  }, ServiceScope.Singleton);

  registerServiceFactory(TodosService, () =>
  {
    const todosOwner   = getService(ToDosOwner);
    const overlayService = getService(OverlayService);
    const formFactory = getService(FormFactory);
    
    const todosService = new TodosServiceImpl(todosOwner, overlayService, formFactory);

    return todosService;
  }, ServiceScope.Singleton);
  
  registerService(FormElementFactory, FormElementFactoryImpl, ServiceScope.Singleton);
  
  registerServiceFactory(FormFactory, () => {
    const formElementFactory = getService(FormElementFactory);
    const formFactory = new FormFactoryImpl(formElementFactory);
    
    return formFactory;
  }, ServiceScope.Singleton);

  registerServiceFactory(OverlayService, () =>
  {
    const overlay = getService(Overlay);
    const overlayService = new OverlayServiceImpl(overlay);

    return overlayService;
  }, ServiceScope.Singleton);

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
    const overlayService = getService(OverlayService);
    const viewmodel = new OverlayViewModelImpl(overlayService);

    return viewmodel;
  });
}