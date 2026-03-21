import type { Action } from "~/types/action";
import type { OverlayElement } from "~/interfaces/overlayElement";

export abstract class OverlayService {
  abstract addElement(element: OverlayElement): void;
  abstract getElements(): OverlayElement[];
  abstract onElementsChange(handler: Action<[elements: OverlayElement[]]>): Action;
}