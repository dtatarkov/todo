import { OverlayElementBase } from "#shared/entities/overlayElementBase";
import { ViewElement } from "#shared/interfaces/viewElement";

export class Modal extends OverlayElementBase {
  private content: ViewElement | undefined;
  
  setContent(content: ViewElement) {
    this.content = content;
  }
  
  getVNode(): object
  {
    const slots: Record<string, object> = {};
    
    if(this.content)
    {
      slots['content'] = () => this.content
    }
    
    const vnode = {
      setup: () => h('UModal', {}, slots)
    }
    
    return vnode;
  }
  
}