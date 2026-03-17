import { ViewElement } from "#shared/interfaces/viewElement";



export abstract class ViewElementBase extends ViewElement {
  getVNode(): { setup: () => () => any }
  {
    const vnode = {
      setup: () => this.getRenderFunction()
    }

    return vnode;
  }
}