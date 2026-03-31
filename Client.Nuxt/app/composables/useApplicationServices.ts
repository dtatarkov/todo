import { OverlayServiceImpl } from "@/services/overlayServiceImpl";
import { OverlayService } from "@/interfaces/overlayService";
import { OverlayBase } from "@/entities/overlay/overlayBase";
import { Overlay } from "@/interfaces/overlay";
import { ZonedDateTimeMapper } from "~/interfaces/zonedDateTimeMapper";
import { ZonedDateTimeMapperImpl } from "~/mappers/zonedDateTimeMapperImpl";
import { TimeMapperImpl } from "~/mappers/timeMapperImpl";
import { TimeMapper } from "~/interfaces/timeMapper";

export function useApplicationServices()
{
  useSharedServices();
  useToDoServices();
  useFormServices();

  registerService(Overlay, OverlayBase, ServiceScope.Singleton);

  registerService(ZonedDateTimeMapper, ZonedDateTimeMapperImpl);

  registerServiceFactory(TimeMapper, () =>
  {
    const datesService = getService(DatesService);
    const mapper       = new TimeMapperImpl(datesService);

    return mapper;
  }, ServiceScope.Singleton);

  registerServiceFactory(OverlayService, () =>
  {
    const overlay        = getService(Overlay);
    const overlayService = new OverlayServiceImpl(overlay);

    return overlayService;
  }, ServiceScope.Singleton);

}