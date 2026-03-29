import { DatesServiceImpl } from "@/services/datesServiceImpl";
import { DatesService } from "@/interfaces/datesService";
import { ToDosService } from "@/interfaces/todosService";
import { TodosServiceImpl } from "@/services/todosServiceImpl";
import { ToDosOwner } from "@/interfaces/todosOwner";
import { ToDosOwnerBase } from "@/entities/todosOwnerBase";
import { ToDosRepository } from "@/interfaces/todosRepository";
import { ToDosRepositoryImpl } from "@/repositories/todosRepositoryImpl";
import { ToDoDtoMapperImpl } from "@/mappers/todoDtoMapperImpl";
import { ToDoDtoMapper } from "@/interfaces/todoDtoMapper";
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
import { StringsService } from "~/interfaces/stringsService";
import { StringsServiceImpl } from "~/services/stringsServiceImpl";
import { ZonedDateTimeMapper } from "~/interfaces/zonedDateTimeMapper";
import { ZonedDateTimeMapperImpl } from "~/mappers/zonedDateTimeMapperImpl";
import { TimeMapperImpl } from "~/mappers/timeMapperImpl";
import { TimeMapper } from "~/interfaces/timeMapper";

export function useApplicationServices()
{
  registerService(ToDosRepository, ToDosRepositoryImpl, ServiceScope.Singleton);
  registerService(Overlay, OverlayBase, ServiceScope.Singleton);

  registerService(SSRLoader, SSRLoaderImpl, ServiceScope.Singleton);

  registerServiceFactory(DatesService, () =>
  {
    const config = getService(AppPublicRuntimeConfig);
    const result = new DatesServiceImpl(config);

    return result;
  }, ServiceScope.Singleton);

  registerService(StringsService, StringsServiceImpl, ServiceScope.Singleton);

  registerServiceFactory(AppPublicRuntimeConfig, () =>
  {
    const config = useRuntimeConfig();

    return config.public;
  }, ServiceScope.Singleton);

  registerServiceFactory(ToDoDtoMapper, () =>
  {
    const datesService = getService(DatesService);
    const mapper       = new ToDoDtoMapperImpl(datesService);

    return mapper;
  }, ServiceScope.Singleton);

  registerService(ZonedDateTimeMapper, ZonedDateTimeMapperImpl);

  registerServiceFactory(TimeMapper, () =>
  {
    const datesService = getService(DatesService);
    const mapper       = new TimeMapperImpl(datesService);

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

  registerServiceFactory(FormElementFactory, () =>
  {
    const datesService        = getService(DatesService);
    const stringsService      = getService(StringsService);
    const zonedDateTimeMapper = getService(ZonedDateTimeMapper);
    const timeMapper          = getService(TimeMapper);

    const result = new FormElementFactoryImpl(datesService, stringsService, zonedDateTimeMapper, timeMapper);

    return result;
  }, ServiceScope.Singleton);

  registerServiceFactory(FormFactory, () =>
  {
    const formElementFactory = getService(FormElementFactory);
    const formFactory        = new FormFactoryImpl(formElementFactory);

    return formFactory;
  }, ServiceScope.Singleton);

  registerServiceFactory(OverlayService, () =>
  {
    const overlay        = getService(Overlay);
    const overlayService = new OverlayServiceImpl(overlay);

    return overlayService;
  }, ServiceScope.Singleton);

  registerServiceFactory(ToDoCardDataMapper, () =>
  {
    const datesService = getService(DatesService);
    const result       = new ToDoCardDataMapperImpl(datesService);

    return result;
  });

  registerServiceFactory(ToDoElementsFactory, () =>
  {
    const todosService = getService(ToDosService);
    const datesService = getService(DatesService);

    const result = new ToDoElementsFactoryImpl(todosService, datesService);

    return result;
  });
}