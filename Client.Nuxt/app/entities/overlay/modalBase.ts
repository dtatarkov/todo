import VModal from "~/components/UI/VModal.vue";
import { Modal } from "~/interfaces/modal";
import type { Overlay } from "~/interfaces/overlay";
import type { UIElement } from "~/interfaces/uiElement";
import { UIElementId } from "~/entities/uiElementId";

export class ModalBase extends Modal
{
  #id = new UIElementId('modal');

  #data = {
    title      : '',
    description: '',
  }

  #parent: Overlay | undefined;

  #children = {
    content: <UIElement | undefined>undefined
  }

  readonly component = {
    setup: () =>
    {
      return () => h(VModal, { modal: this });
    }
  }

  get id()
  {
    return this.#id.value;
  }

  get title()
  {
    return this.#data.title;
  }

  set title(value)
  {
    this.#data.title = value;
  }

  get description()
  {
    return this.#data.description;
  }

  set description(value)
  {
    this.#data.description = value;
  }

  get parent()
  {
    return this.#parent;
  }

  set parent(value)
  {
    this.#parent = value;
  }

  get content()
  {
    return this.#children.content;
  }

  set content(content)
  {
    this.#children.content = content;
  }

  close()
  {
    if (!this.parent)
    {
      throw new Error('Parent is not defined');
    }

    this.parent.removeElement(this);
  }
}
