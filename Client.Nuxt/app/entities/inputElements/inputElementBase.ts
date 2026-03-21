import type { InputElementData } from "@/types/inputElementData";
import { InputElement } from "@/interfaces/inputElement";
import { AsViewElement } from "~/mixins/asViewElement";

export abstract class InputElementBase<V = any, D extends InputElementData<V> = InputElementData<V>, > extends AsViewElement(InputElement)
{
  protected data: D = this.getDefaultData();

  get name()
  {
    return this.data.name;
  }
  
  get value()
  {
    return this.data.value;
  }

  setData(data?: Partial<D>)
  {
    Object.assign(this.data, data);
  }  

  setValue(value: V): void
  {
    this.data.value = value;
  }

  protected getProps(): Record<string, any>
  {
    return {
      ...this.data,

      modelValue: this.data.value,
      class     : this.getCssClasses(),

      'update:modelValue': (value: V) =>
      {
        this.setValue(value);
      }
    }
  }

  protected getDefaultData(): D
  {
    return {
      id       : '',
      name     : '',
      autofocus: false,
    } as D;
  }

  protected getCssClasses()
  {
    return 'w-full';
  }
}