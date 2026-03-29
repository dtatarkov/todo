import { InputElementBase } from "@/entities/inputElements/inputElementBase";
import { UInputDate } from "#components";
import { mergeDeep } from "~/utils/mergeDeep";
import { OptionalValueMapper } from "~/mappers/optionalValueMapper";
import type { ZonedDateTimeMapper } from "~/interfaces/zonedDateTimeMapper";

export class InputElementDate extends InputElementBase<Date | undefined>
{
  readonly component = {
    setup: () =>
    {
      return () => h(UInputDate, this.getProps());
    }
  }

  constructor(
    zonedDateTimeMapper: ZonedDateTimeMapper
  )
  {
    super();

    Object.assign(this.data, { value: undefined });

    Object.assign(this.staticData, {
      hideTimeZone: true,
      granularity : 'day',
    });

    this.propertiesScheme = mergeDeep(this.propertiesScheme, {
      modelValue: {
        mapper: new OptionalValueMapper(zonedDateTimeMapper)
      }
    });
  }
}