import { InputElementBase } from "@/entities/inputElements/inputElementBase";
import type { InputElementDateData } from "@/types/InputElementDateData";
import { UInputDate } from "#components";
import { getLocalTimeZone, parseAbsolute, ZonedDateTime } from "@internationalized/date";

export class InputElementDate extends InputElementBase<Date | undefined, InputElementDateData>
{
  override getRenderFunction(): () => object
  {
    return () => h(UInputDate, this.getProps());
  }

  protected override getProps(): Record<string, any>
  {
    const datetime = this.toDateTime(this.value);

    const props = {
      ...super.getProps(),

      modelValue: datetime,
      hideTimeZone: true,
      granularity: 'day',

      'update:modelValue': (datetime: ZonedDateTime) =>
      {
        const date = datetime?.toDate();

        this.setValue(date);
      }
    }

    return props;
  }

  private toDateTime(value?: Date): ZonedDateTime | undefined
  {
    if (!value)
    {
      return undefined;
    }

    const timezone = getLocalTimeZone();
    const result   = parseAbsolute(value.toISOString(), timezone);

    return result;
  }
}