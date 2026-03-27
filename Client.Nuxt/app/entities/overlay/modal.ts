import { ViewElement } from "@/interfaces/viewElement";
import { UModal } from "#components";
import { OverlayElementBase } from "~/entities/overlay/overlayElementBase";
import type { RenderFunction } from "@/types/renderFunction";
import type { Action } from "~/types/action";
import { ObservableBase } from "~/entities/observableBase";

export class Modal extends OverlayElementBase
{
  private content: ViewElement | undefined;
  private title: string | undefined;
  private description: string | undefined;

  private isOpened = new ObservableBase(false);

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

  override getRenderFunction(): RenderFunction
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

  override getVNode(): { setup: () => RenderFunction }
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
