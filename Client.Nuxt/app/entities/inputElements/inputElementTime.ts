import { InputElementBase } from "@/entities/inputElements/inputElementBase";
import type { InputElementTimeData } from "@/types/inputElementTimeData";
import { UInputTime } from "#components";
import { Time } from "@internationalized/date";
import type { DatesService } from "~/interfaces/datesService";

export class InputElementTime extends InputElementBase<number | undefined, InputElementTimeData>
{
  constructor(private datesService: DatesService)
  {
    super();
  }
  
  override getRenderFunction(): () => object
  {
    return () => h(UInputTime, this.getProps());
  }

  protected override getProps(): Record<string, any>
  {
    let time = this.toTime(this.value);

    let props = {
      ...super.getProps(),

      modelValue  : time,
      hideTimeZone: true,
      granularity : 'minute',

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
    
    let availableMilliseconds = value;
    
    const hours   = Math.floor(availableMilliseconds / this.datesService.hourInMilliseconds);
    availableMilliseconds -= hours * this.datesService.hourInMilliseconds;
    
    const minutes = Math.floor(availableMilliseconds / this.datesService.minuteInMilliseconds);
    availableMilliseconds -= minutes * this.datesService.minuteInMilliseconds;
    
    const seconds = Math.floor((availableMilliseconds) / this.datesService.secondInMilliseconds);
    availableMilliseconds -= seconds * this.datesService.secondInMilliseconds;

    const time = new Time(hours, minutes, seconds, availableMilliseconds);

    return time;
  }

  private fromTime(time?: Time): number | undefined
  {
    if (!time)
    {
      return undefined;
    }

    const hours   = time.hour * 60 * 60 * 1000;
    const minutes = time.minute * 60 * 1000;
    const seconds = time.second * 1000;

    const result = hours + minutes + seconds + time.millisecond;

    return result;
  }
}
