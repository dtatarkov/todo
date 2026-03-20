import { InputElementBase } from "#shared/entities/inputElements/inputElementBase";

export interface InputElementWithPlaceholderData<V> extends InputElementData<V>
{
  placeholder: string;
}

export function InputElementWithPlaceholder<D extends InputElementWithPlaceholderData<any>, TBase extends AbstractConstructor<InputElementBase<any, D>>>(Base: TBase)
{
  abstract class WithPlaceholder extends Base
  {
    constructor(...args: any[])
    {
      super(...args);
    }

    get placeholder(): string
    {
      return this.data.placeholder;
    }

    protected override getDefaultData()
    {
      return {
        ...super.getDefaultData(),

        placeholder: ''
      }
    }
  }

  return WithPlaceholder;
}