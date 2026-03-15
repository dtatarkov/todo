import { OverlayService } from "#shared/interfaces/overlayService";
import type { Overlay } from "#shared/interfaces/overlay";
import  { type Observable } from "#shared/models/observable";
import type { OverlayElement } from "#shared/entities/overlayElement";

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