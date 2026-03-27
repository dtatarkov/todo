import type { OverlayElement } from "~/interfaces/overlayElement";

export abstract class OverlayService {
  abstract addElement(element: OverlayElement): void;
  abstract removeElement(element: OverlayElement): void;
  abstract getElementsRef(): ComputedRef<OverlayElement[]>;
}