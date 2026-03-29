import type { AbstractConstructor } from "~/types/abstractConstructor";
import type { InputElementBase } from "~/entities/inputElements/inputElementBase";

export function InputElementWithPlaceholder<TBase extends AbstractConstructor<InputElementBase>>(Base: TBase)
{
  abstract class WithPlaceholder extends Base
  {
    constructor(...args: any[])
    {
      super(...args);

      Object.assign(this.data, {
        placeholder: ''
      });

      mergeDeep(this.propertiesScheme, {
        placeholder: {}
      });
    }
  }

  return WithPlaceholder;
}