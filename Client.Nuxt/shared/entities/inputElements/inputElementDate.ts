import { InputElement } from "#shared/entities/inputElements/inputElement";
import { InputElementDateData } from "#shared/types/InputElementDateData";
import { UInputDate } from "#components";
import { CalendarDate, getLocalTimeZone, parseAbsolute, parseDate } from "@internationalized/date";

export class InputElementDate extends InputElement<Date | undefined, InputElementDateData>
{
  override getRenderFunction(): () => object
  {
    return () => h(UInputDate, this.getProps());
  }

  protected override getProps(): Record<string, any>
  {
    let internationalizedValue = this.toInternationalizedValue(this.value);

    let props = {
      ...super.getProps(),

      modelValue: internationalizedValue,

      'update:modelValue': (value: CalendarDate) =>
      {
        let nativeValue = this.fromInternationalizedValue(value);

        this.setValue(nativeValue);
      }
    }

    return props;
  }

  private toInternationalizedValue(value?: Date): CalendarDate | undefined
  {
    if (!value)
    {
      return undefined;
    }

    const timezone = getLocalTimeZone();
    const result   = parseAbsolute(value.toISOString(), timezone);

    return result;
  }

  private fromInternationalizedValue(value?: CalendarDate): Date | undefined
  {
    if (!value)
    {
      return undefined;
    }

    const timezone = getLocalTimeZone();
    const result   = value.toDate(timezone);

    return result;
  }
}