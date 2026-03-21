import { OverlayService } from "@/interfaces/overlayService";
import type { Overlay } from "@/interfaces/overlay";
import type { Action } from "@/types/action";
import type { OverlayElement } from "~/interfaces/overlayElement";

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