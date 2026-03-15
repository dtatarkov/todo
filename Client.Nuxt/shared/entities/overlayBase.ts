import { Overlay } from "#shared/interfaces/overlay";
import { OverlayElement } from "#shared/interfaces/overlayElement";
import { Observable } from "#shared/models/observable";

export class OverlayBase extends Overlay {
  private elements = new Observable<OverlayElement[]>([]);

  override addElement(element: OverlayElement): void
  {
    const currentElements = this.elements.get();
    const newElements = [...currentElements, element];
    
    this.elements.set(newElements);
  }

  getElements(): Observable<OverlayElement[]> {
    return this.elements;
  }
  
  destroy(): void
  {
    this.elements.destroy();
  }
}