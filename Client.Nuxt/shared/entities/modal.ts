import { ViewElement } from "#shared/interfaces/viewElement";
import { UModal } from "#components";
import { OverlayElement } from "#shared/entities/overlayElement";

export class Modal extends OverlayElement {
  private content: ViewElement | undefined;
  
  setContent(content: ViewElement) {
    this.content = content;
  }

  override getRenderFunction(): () => object
  {
    const slots: Record<string, object> = {};

    if(this.content)
    {
      slots['content'] = this.content.getRenderFunction();
    }
    
    return () => h(UModal, { open: true }, slots);
  }

  getVNode(): { setup: () => () => any }
  {
    const vnode = {
      setup: () => this.getRenderFunction()
    }
    
    return vnode;
  }
  
}