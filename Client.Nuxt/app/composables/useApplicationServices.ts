import { OverlayServiceImpl } from "@/services/overlayServiceImpl";
import { OverlayService } from "@/interfaces/overlayService";
import { OverlayBase } from "@/entities/overlay/overlayBase";
import { Overlay } from "@/interfaces/overlay";
import { FormElementFactory } from "@/interfaces/formElementFactory";
import { FormElementFactoryImpl } from "@/factories/formElementFactoryImpl";
import { FormFactory } from "@/interfaces/formFactory";
import { FormFactoryImpl } from "@/factories/formFactoryImpl";
import { SSRLoader } from "~/interfaces/ssrLoader";
import { SSRLoaderImpl } from "~/services/ssrLoaderImpl";
import { ZonedDateTimeMapper } from "~/interfaces/zonedDateTimeMapper";
import { ZonedDateTimeMapperImpl } from "~/mappers/zonedDateTimeMapperImpl";
import { TimeMapperImpl } from "~/mappers/timeMapperImpl";
import { TimeMapper } from "~/interfaces/timeMapper";

export function useApplicationServices()
{
  useSharedServices();
  useToDoServices();

  registerService(Overlay, OverlayBase, ServiceScope.Singleton);

  registerService(SSRLoader, SSRLoaderImpl, ServiceScope.Singleton);

  registerService(ZonedDateTimeMapper, ZonedDateTimeMapperImpl);

  registerServiceFactory(TimeMapper, () =>
  {
    const datesService = getService(DatesService);
    const mapper       = new TimeMapperImpl(datesService);

    return mapper;
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

}