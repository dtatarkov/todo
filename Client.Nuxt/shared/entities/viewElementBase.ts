import { ViewElement } from "#shared/interfaces/viewElement";

let lastElementId = 0;

export abstract class ViewElementBase extends ViewElement {
  readonly id = lastElementId++;
  
  getVNode(): { setup: () => () => any }
  {
    const vnode = {
      setup: () => this.getRenderFunction()
    }

    return vnode;
  }
}