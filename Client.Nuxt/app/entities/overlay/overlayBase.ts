import { Overlay } from "@/interfaces/overlay";
import { Observable } from "@/models/observable";
import  { type OverlayElement } from "@/entities/overlay/overlayElement";
import type { Action } from "@/types/action";

export class OverlayBase extends Overlay {
  private observableElements = new Observable(new Set<OverlayElement>());

  override addElement(element: OverlayElement): void
  {
    const currentElements = this.observableElements.get();
    const newElements = new Set([...currentElements, element]);
    
    this.observableElements.set(newElements);

    element.onClose(() => {
      this.removeElement(element);
    });
  }

  removeElement(element: OverlayElement): void {
    const currentElements = this.observableElements.get();
    const newElements = new Set(currentElements);

    newElements.delete(element);

    this.observableElements.set(newElements);
    element.destroy();
  }

  getElements(): OverlayElement[] {
    const elementsSet = this.observableElements.get();
    const elements = [...elementsSet];
    
    return elements;    
  }

  override onElementsChange(handler: Action<[elements: OverlayElement[]]>): Action
  {
    const unsubscribe = this.observableElements.subscribe(elementsSet => {
      const elements = [...elementsSet];
      
      handler(elements);
    });
    
    return unsubscribe;
  }

  destroy(): void
  {
    let currentElements = this.observableElements.get();
    
    currentElements.forEach((element) => {
      element.destroy();
    });
    
    this.observableElements.destroy();
  }
}