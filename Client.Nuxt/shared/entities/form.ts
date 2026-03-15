import { ViewElement } from "#shared/interfaces/viewElement";

export class Form extends ViewElement {
  getVNode(): object {
    const vnode = {
      setup: () => h('UForm')
    }
    
    return vnode;
  }
}