import { InputElementBase } from "@/entities/inputElements/inputElementBase";
import { UInputTime } from "#components";
import type { TimeMapper } from "~/interfaces/timeMapper";
import { mergeDeep } from "~/utils/mergeDeep";
import { OptionalValueMapper } from "~/mappers/optionalValueMapper";

export class InputElementTime extends InputElementBase<number | undefined>
{
  readonly component = {
    setup: () =>
    {
      return () => h(UInputTime, this.getProps());
    }
  }

  constructor(
    timeMapper: TimeMapper
  )
  {
    super();

    Object.assign(this.data, { value: undefined });

    Object.assign((this.staticData, {
      hideTimeZone: true,
      granularity : 'minute',
    }));

    this.propertiesScheme = mergeDeep(this.propertiesScheme, {
      modelValue: {
        mapper: new OptionalValueMapper(timeMapper)
      }
    });
  }
}
