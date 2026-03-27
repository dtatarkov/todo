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
import { AppPublicRuntimeConfig } from "~/interfaces/appRuntimeConfig";
import { ToDoCardDataMapper } from "~/interfaces/todoCardDataMapper";
import { ToDoCardDataMapperImpl } from "~/mappers/todoCardDataMapperImpl";
import { ToDoElementsFactory } from "~/interfaces/todoElementsFactory";
import { ToDoElementsFactoryImpl } from "~/factories/todoElementsFactoryImpl";
import { SSRLoader } from "~/interfaces/ssrLoader";
import { SSRLoaderImpl } from "~/services/ssrLoaderImpl";

export function useApplicationServices()
{
  registerService(ToDosRepository, ToDosRepositoryImpl, ServiceScope.Singleton);
  registerService(Overlay, OverlayBase, ServiceScope.Singleton);
  
  registerService(SSRLoader, SSRLoaderImpl, ServiceScope.Singleton);
  
  registerServiceFactory(DatesService, () => {
    const config = getService(AppPublicRuntimeConfig);
    const result = new DatesServiceImpl(config);
    
    return result;
  }, ServiceScope.Singleton)
  
  registerServiceFactory(AppPublicRuntimeConfig, () => {
    const config = useRuntimeConfig();
    
    return config.public;
  }, ServiceScope.Singleton);

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
    const ssrLoader       = getService(SSRLoader);
    const todoOwner       = new ToDosOwnerBase(todosRepository, todoDtoMapper, ssrLoader);

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
  
  registerServiceFactory(FormElementFactory, () =>
  {
    const datesService = getService(DatesService);
    const result = new FormElementFactoryImpl(datesService);
    
    return result;
  }, ServiceScope.Singleton);
  
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
  
  registerServiceFactory(ToDoCardDataMapper, () => {
    const datesService = getService(DatesService);
    const result = new ToDoCardDataMapperImpl(datesService);
    
    return result;
  });
  
  registerServiceFactory(ToDoElementsFactory, () => {
    const todosService = getService(TodosService);
    const datesService = getService(DatesService);
    
    const result = new ToDoElementsFactoryImpl(todosService, datesService);
    
    return result;
  });

  registerServiceFactory(OverlayViewModel, () =>
  {
    const overlayService = getService(OverlayService);
    const viewmodel = new OverlayViewModelImpl(overlayService);

    return viewmodel;
  });
}