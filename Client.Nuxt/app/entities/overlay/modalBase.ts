import { ViewElement } from "@/interfaces/viewElement";
import { OverlayElementBase } from "~/entities/overlay/overlayElementBase";
import type { RenderFunction } from "@/types/renderFunction";
import VModal from "~/components/UI/VModal.vue";
import { Modal } from "~/interfaces/modal";
import type { Overlay } from "~/interfaces/overlay";

export class ModalBase extends Modal
{
  private base = new OverlayElementBase();

  private data = {
    title      : '',
    description: '',
  }

  private _parent: Overlay | undefined;

  private children = {
    content: <ViewElement | undefined>undefined
  }

  get id()
  {
    return this.base.id;
  }

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

  get parent()
  {
    return this._parent;
  }

  set parent(value)
  {
    this._parent = value;
  }

  get content()
  {
    return this.children.content;
  }

  set content(content: ViewElement | undefined)
  {
    this.children.content = content;
  }

  close()
  {
    if (!this.parent)
    {
      throw new Error('Parent is not defined');
    }

    this.parent.removeElement(this);
  }

  override getVNode(): { setup: () => RenderFunction }
  {
    const vnode = {
      setup: () =>
      {
        return () => h(VModal, { modal: this });
      }
    }

    return vnode;
  }
}
