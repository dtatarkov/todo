import { ViewElement } from "#shared/interfaces/viewElement";
import { UModal } from "#components";
import { OverlayElement } from "#shared/entities/overlayElement";
import { Observable } from "#shared/models/observable";

export class Modal extends OverlayElement
{
  private content: ViewElement | undefined;
  private title: string | undefined;
  private description: string | undefined;

  private isOpened = new Observable(false);

  setContent(content: ViewElement)
  {
    this.content = content;
  }

  setTitle(title: string)
  {
    this.title = title;
  }

  setDescription(description: string)
  {
    this.description = description;
  }

  override destroy(): void
  {
    this.isOpened.destroy();
  }

  override getRenderFunction(): () => object
  {
    const slots: Record<string, object> = {};

    if (this.content)
    {
      slots['content'] = this.content.getRenderFunction();
    }

    return () => h(UModal, {
      defaultOpen: true,
      title      : this.title,
      description: this.description,
      transition : false,

      'onUpdate:open': (isOpened: boolean) =>
      {
        this.isOpened.set(isOpened);
      }
    }, slots);
  }

  getVNode(): { setup: () => () => any }
  {
    const vnode = {
      setup: () => this.getRenderFunction()
    }

    return vnode;
  }

  override onClose(handler: Action): void
  {
    this.isOpened.subscribe(isOpened =>
    {
      if (!isOpened)
      {
        handler();
      }
    });
  }
}
