import { ZonedDateTimeMapper } from "~/interfaces/zonedDateTimeMapper";
import { TimeMapper } from "~/interfaces/timeMapper";
import { FormElementFactory } from "../interfaces/formElementFactory";
import { FormFactory } from "../interfaces/formFactory";
import { FormElementFactoryImpl } from "../factories/formElementFactoryImpl";
import { FormFactoryImpl } from "../factories/formFactoryImpl";

export function useFormServices()
{
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
}