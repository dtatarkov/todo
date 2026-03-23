import { InputElementDate } from "./inputElementDate";
import { InputElementTime } from "~/entities/inputElements/inputElementTime";
import { AsViewElement } from "~/mixins/asViewElement";
import { InputElement } from "~/interfaces/inputElement";
import type { InputElementDateTimeData } from "~/types/InputElementDateTimeData";
import  { type DatesService } from "~/interfaces/datesService";
import type { RenderFunction } from "~/types/renderFunction";
import type { InputElementTimeData } from "~/types/inputElementTimeData";

export class InputElementDateTime extends AsViewElement(InputElement<Date | undefined, InputElementDateTimeData>)
{
  private inputDate: InputElementDate;
  private inputTime: InputElementTime;

  constructor(
    private datesService: DatesService
  )
  {
    super();

    this.inputDate = new InputElementDate();
    this.inputTime = new InputElementTime(this.datesService);
  }
  
  get name() {
    return this.inputDate.name;
  }

  get value(): Date | undefined
  {
    const date = this.inputDate.value;
    const timeInMilliseconds = this.inputTime.value;

    if (!date || !timeInMilliseconds)
    {
      return undefined;
    }
    
    const result = this.datesService.setTime(date, timeInMilliseconds);
    
    return result;
  }

  setValue(value: Date | undefined)
  {
    if (!value)
    {
      this.inputDate.setValue(undefined);
      this.inputTime.setValue(undefined);
      return;
    }
    
    const time = this.datesService.getTime(value);
    const date = this.datesService.setTime(value, 0);

    this.inputDate.setValue(date);
    this.inputTime.setValue(time);
  }
  
  setData(data?: Partial<InputElementDateTimeData>){
    if(data?.value)
    {
      this.setValue(data.value);
      delete data.value;
    }
    
    this.inputDate.setData(data);
    this.inputTime.setData(data as unknown as InputElementTimeData);
  }

  getRenderFunction(): RenderFunction
  {
    const props = {
      class: 'flex gap-1'
    }
    
    const children = [
      h(this.inputDate.getVNode()),
      h(this.inputTime.getVNode())
    ]
    
    return () => h('div', props, children)
  }
}