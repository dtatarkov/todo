import { ViewElement } from "#shared/interfaces/viewElement";
import { UModal } from "#components";
import { OverlayElement } from "#shared/entities/overlayElement";

export class Modal extends OverlayElement {
  private content: ViewElement | undefined;
  private title: string | undefined;
  private description: string | undefined;

  setContent(content: ViewElement) {
    this.content = content;
  }

  setTitle(title: string) {
    this.title = title;
  }

  setDescription(description: string) {
    this.description = description;
  }

  override getRenderFunction(): () => object {
    const slots: Record<string, object> = {};

    if(this.content) {
      slots['content'] = this.content.getRenderFunction();
    }

    return () => h(UModal, {
      open: true,
      title: this.title,
      description: this.description
    }, slots);
  }

  getVNode(): { setup: () => () => any } {
    const vnode = {
      setup: () => this.getRenderFunction()
    }

    return vnode;
  }
}
