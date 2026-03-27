import type { OverlayElement } from "./overlayElement";
import type { Modal } from "~/interfaces/modal";

export abstract class Overlay {
  abstract readonly elements: ComputedRef<OverlayElement[]>;
  
  abstract createModal(): Modal;
  abstract addElement(element: OverlayElement): void;
  abstract removeElement(element: OverlayElement): void;
}