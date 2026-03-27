import { Overlay } from "@/interfaces/overlay";
import type { OverlayElement } from "~/interfaces/overlayElement";
import { ModalBase } from "~/entities/overlay/modalBase";

export class OverlayBase extends Overlay
{
  private elementsSet = shallowRef(new Set<OverlayElement>());
  private elements    = computed(() => [...this.elementsSet.value]);
  
  override createModal()
  {
    const modal = new ModalBase();
    modal.parent = this;
    
    this.addElement(modal);
    
    return modal;
  }

  override addElement(element: OverlayElement): void
  {
    const currentElements = this.elementsSet.value;
    const newElements     = new Set([...currentElements, element]);

    this.elementsSet.value = newElements;
  }

  removeElement(element: OverlayElement): void
  {
    if (!this.elementsSet.value.has(element))
    {
      return;
    }

    const currentElements = this.elementsSet.value;
    const newElements     = new Set(currentElements);

    newElements.delete(element);

    this.elementsSet.value = newElements;
  }

  getElementsRef(): ComputedRef<OverlayElement[]>
  {
    return this.elements;
  }
}