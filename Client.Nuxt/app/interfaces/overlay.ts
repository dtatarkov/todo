import type { OverlayElement } from "./overlayElement";

export abstract class Overlay {
  abstract addElement(element: OverlayElement): void;
  abstract removeElement(element: OverlayElement): void;
  abstract getElementsRef(): ComputedRef<OverlayElement[]>;
}