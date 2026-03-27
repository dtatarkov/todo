import type { OverlayElement } from "./overlayElement";
import type { Modal } from "~/interfaces/modal";

export abstract class Overlay {
  abstract createModal(): Modal;
  abstract addElement(element: OverlayElement): void;
  abstract removeElement(element: OverlayElement): void;
  abstract getElementsRef(): ComputedRef<OverlayElement[]>;
}