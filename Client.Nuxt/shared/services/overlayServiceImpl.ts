import { OverlayService } from "#shared/interfaces/overlayService";
import type { Overlay } from "#shared/interfaces/overlay";
import  { type OverlayElement } from "#shared/entities/overlay/overlayElement";
import type { Action } from "#shared/types/action";

export class OverlayServiceImpl extends OverlayService {
  constructor(protected overlay: Overlay)
  {
    super();
  }

  addElement(element: OverlayElement): void
  {
    this.overlay.addElement(element);
  }
  
  getElements(): OverlayElement[]
  {
    return this.overlay.getElements();
  }

  override onElementsChange(handler: Action<[elements: OverlayElement[]]>): Action
  {
    return this.overlay.onElementsChange(handler);
  }
}