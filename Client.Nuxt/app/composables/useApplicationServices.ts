import { ZonedDateTimeMapper } from "~/interfaces/zonedDateTimeMapper";
import { ZonedDateTimeMapperImpl } from "~/mappers/zonedDateTimeMapperImpl";
import { TimeMapperImpl } from "~/mappers/timeMapperImpl";
import { TimeMapper } from "~/interfaces/timeMapper";

export function useApplicationServices()
{
  registerService(ZonedDateTimeMapper, ZonedDateTimeMapperImpl);

  registerServiceFactory(TimeMapper, () =>
  {
    const datesService = getService(DatesService);
    const mapper       = new TimeMapperImpl(datesService);

    return mapper;
  }, ServiceScope.Singleton);

}