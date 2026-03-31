import { FormFactory } from "~/interfaces/formFactory";
import { ToDosRepository } from "../interfaces/todosRepository";
import { ToDoDtoMapper } from "../interfaces/todoDtoMapper";
import { ToDoDtoMapperImpl } from "../mappers/todoDtoMapperImpl";
import { ToDosOwner } from "../interfaces/todosOwner";
import { ToDosOwnerBase } from "../entities/todosOwnerBase";
import { ToDosService } from "../interfaces/todosService";
import { TodosServiceImpl } from "@@/modules/todo/runtime/app/services/todosServiceImpl";
import { ToDoElementsFactory } from "@@/modules/todo/runtime/app/interfaces/todoElementsFactory";
import { ToDoElementsFactoryImpl } from "@@/modules/todo/runtime/app/factories/todoElementsFactoryImpl";
import { ToDosRepositoryImpl } from "../repositories/todosRepositoryImpl";
import { OverlayService } from "~/interfaces/overlayService";

export function useToDoServices()
{
  registerService(ToDosRepository, ToDosRepositoryImpl, ServiceScope.Singleton);

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

  registerServiceFactory(ToDosService, () =>
  {
    const todosOwner     = getService(ToDosOwner);
    const overlayService = getService(OverlayService);
    const formFactory    = getService(FormFactory);

    const todosService = new TodosServiceImpl(todosOwner, overlayService, formFactory);

    return todosService;
  }, ServiceScope.Singleton);

  registerServiceFactory(ToDoElementsFactory, () =>
  {
    const todosService = getService(ToDosService);
    const datesService = getService(DatesService);

    const result = new ToDoElementsFactoryImpl(todosService, datesService);

    return result;
  });
}