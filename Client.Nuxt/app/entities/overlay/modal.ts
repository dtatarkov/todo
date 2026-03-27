import { ViewElement } from "@/interfaces/viewElement";
import { OverlayElementBase } from "~/entities/overlay/overlayElementBase";
import type { RenderFunction } from "@/types/renderFunction";
import type { Action } from "~/types/action";
import VModal from "~/components/UI/VModal.vue";

export class Modal extends OverlayElementBase
{
  private data = {
    title      : '',
    description: '',
  }
  
  private children = { 
    content: <ViewElement | undefined>undefined
  }

  private closeHandler: Action | undefined;

  get title()
  {
    return this.data.title;
  }

  set title(value)
  {
    this.data.title = value;
  }

  get description()
  {
    return this.data.description;
  }

  set description(value)
  {
    this.data.description = value;
  }
  
  get content()
  {
    return this.children.content;
  }

  set content(content: ViewElement | undefined)
  {
    this.children.content = content;
  }
  
  close() {
    this.closeHandler?.();
  }

  override getRenderFunction(): RenderFunction
  {
    return () => h(VModal, { modal: this });
  }

  override getVNode(): { setup: () => RenderFunction }
  {
    const vnode = {
      setup: () => this.getRenderFunction()
    }

    return vnode;
  }

  override onClose(handler: Action): void
  {
    if(this.closeHandler)
    {
      throw new Error('Close handler is already defined');
    }
    
    this.closeHandler = handler;
  }
}
