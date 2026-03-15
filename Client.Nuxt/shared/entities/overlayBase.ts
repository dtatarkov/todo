import { Overlay } from "#shared/interfaces/overlay";
import { OverlayElement } from "#shared/interfaces/overlayElement";
import { Observable } from "#shared/models/observable";

export class OverlayBase extends Overlay {
  private elements = new Observable<OverlayElement[]>([]);
  
  getElements(): Observable<OverlayElement[]> {
    return this.elements;
  }
  
  destroy(): void
  {
    this.elements.destroy();
  }
}