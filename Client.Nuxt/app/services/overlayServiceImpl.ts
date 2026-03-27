import { OverlayService } from "@/interfaces/overlayService";
import type { Overlay } from "@/interfaces/overlay";
import { type OverlayElement } from "~/interfaces/overlayElement";

export class OverlayServiceImpl extends OverlayService {
  constructor(protected overlay: Overlay)
  {
    super();
  }

  addElement(element: OverlayElement): void
  {
    this.overlay.addElement(element);
  }

  override removeElement(element: OverlayElement)
  {
    this.overlay.removeElement(element);
  }

  getElementsRef(): ComputedRef<OverlayElement[]>
  {
    return this.overlay.getElementsRef();
  }
}