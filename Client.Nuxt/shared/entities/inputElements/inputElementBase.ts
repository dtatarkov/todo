import { ViewElementBase } from "#shared/entities/viewElementBase";
import { InputElementData } from "#shared/types/inputElementData";
import type { InputElement } from "#shared/interfaces/inputElement";

export abstract class InputElementBase<V = any, D extends InputElementData<V> = InputElementData<V>, > extends ViewElementBase implements InputElement<V, D>
{
  protected data: D = this.getDefaultData();

  get name()
  {
    return this.data.name;
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