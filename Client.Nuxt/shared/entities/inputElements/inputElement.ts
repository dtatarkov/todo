import { ViewElementBase } from "#shared/entities/viewElementBase";
import { InputElementData } from "#shared/types/inputElementData";

export abstract class InputElement<V = any, D extends InputElementData<V> = InputElementData<V>, > extends ViewElementBase
{
  protected data: D;

  constructor(data?: Partial<D>)
  {
    super();

    this.data = {
      ...this.getDefaultData(),
      ...data
    };
  }

  get id(): string
  {
    return this.data.id;
  }

  get name(): string
  {
    return this.data.name;
  }

  get autofocus(): boolean {
    return this.data.autofocus;
  }

  get value(): V
  {
    return this.data.value;
  }

  setValue(value: V): void
  {
    this.data.value = value;
  }

  protected getProps(): Record<string, any> {
    return {
      ...this.data,

      modelValue : this.value,
      class      : this.getCssClasses(),

      'update:modelValue': (value: V) =>
      {
        this.setValue(value);
      }
    }
  }

  protected getDefaultData(): D {
    return {
      id: '',
      name: '',
      autofocus: false,
    } as D;
  }
  
  protected getCssClasses() {
    return 'w-full';
  }
}