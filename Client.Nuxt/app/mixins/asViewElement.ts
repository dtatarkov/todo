import type { AbstractConstructor } from "~/types/abstractConstructor";
import type { ViewElement } from "~/interfaces/viewElement";

export function AsViewElement<TBase extends AbstractConstructor<ViewElement>>(Base: TBase)
{
  abstract class BaseAsViewElement extends Base implements ViewElement
  {
    constructor(...args: any[])
    {
      super(...args);
    }

    getVNode(): { setup: () => () => any }
    {
      const vnode = {
        setup: () => this.getRenderFunction()
      }

      return vnode;
    }
  }

  return BaseAsViewElement;
}