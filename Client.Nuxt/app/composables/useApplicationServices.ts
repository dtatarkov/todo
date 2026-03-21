import { DatesServiceImpl } from "@/services/datesServiceImpl";
import { DatesService } from "@/interfaces/datesService";
import { TodosService } from "@/interfaces/todosService";
import { TodosServiceImpl } from "@/services/todosServiceImpl";
import { ToDosOwner } from "@/interfaces/todosOwner";
import { ToDosOwnerBase } from "@/entities/todosOwnerBase";
import { ToDosRepository } from "@/interfaces/todosRepository";
import { ToDosRepositoryImpl } from "@/repositories/todosRepositoryImpl";
import { ToDoDtoMapperImpl } from "@/mappers/todoDtoMapperImpl";
import { ToDoDtoMapper } from "@/interfaces/todoDtoMapper";
import { TodosViewModel } from "@/interfaces/todosViewModel";
import { TodosViewModelImpl } from "@/viewmodels/todosViewModelImpl";
import { ToDoViewModel } from "@/interfaces/todoViewModel";
import { ToDoViewModelImpl } from "@/viewmodels/todoViewModelImpl";
import { OverlayViewModel } from "@/interfaces/overlayViewModel";
import { OverlayViewModelImpl } from "@/viewmodels/overlayViewModelImpl";
import { OverlayServiceImpl } from "@/services/overlayServiceImpl";
import { OverlayService } from "@/interfaces/overlayService";
import { OverlayBase } from "@/entities/overlay/overlayBase";
import { Overlay } from "@/interfaces/overlay";
import { ServiceScope } from "@/enums/serviceScope";
import { FormElementFactory } from "@/interfaces/formElementFactory";
import { FormElementFactoryImpl } from "@/factories/formElementFactoryImpl";
import { FormFactory } from "@/interfaces/formFactory";
import { FormFactoryImpl } from "@/factories/formFactoryImpl";

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