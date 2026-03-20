import { InputElementBase } from "#shared/entities/inputElements/inputElementBase";
import { InputElementTimeData } from "#shared/types/inputElementTimeData";
import { UInputTime } from "#components";
import { Time } from "@internationalized/date";

export class InputElementTime extends InputElementBase<number | undefined, InputElementTimeData>
{
  override getRenderFunction(): () => object
  {
    return () => h(UInputTime, this.getProps());
  }

  protected override getProps(): Record<string, any>
  {
    let time = this.toTime(this.value);

    let props = {
      ...super.getProps(),

      modelValue: time,
      hideTimeZone: true,
      granularity: 'minute',

      'update:modelValue': (time: Time) =>
      {
        let value = this.fromTime(time);

        this.setValue(value);
      }
    }

    return props;
  }

  private toTime(value?: number): Time | undefined
  {
    if (!value)
    {
      return undefined;
    }
    
    const hours = Math.floor(value / 3600);
    const minutes = Math.floor((value - hours * 3600) / 60);
    const seconds = value - hours * 3600 - minutes * 60;

    const result   = new Time(hours, minutes, seconds);

    return result;
  }

  private fromTime(value?: Time): number | undefined
  {
    if (!value)
    {
      return undefined;
    }
    
    const hoursInSeconds = value.hour * 3600;
    const minutesInSeconds = value.minute * 60;
    const seconds = value.second;

    const result = hoursInSeconds + minutesInSeconds + seconds;

    return result;
  }
}
