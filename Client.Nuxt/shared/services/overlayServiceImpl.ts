import { OverlayService } from "#shared/interfaces/overlayService";
import { OverlayElement } from "#shared/interfaces/overlayElement";
import type { Overlay } from "#shared/interfaces/overlay";
import  { type Observable } from "#shared/models/observable";

export class OverlayServiceImpl extends OverlayService {
  constructor(protected overlay: Overlay)
  {
    super();
  }

  addElement(element: OverlayElement): void
  {
    this.overlay.addElement(element);
  }
  
  getElements(): Observable<OverlayElement[]>
  {
    return this.overlay.getElements();
  }  
}