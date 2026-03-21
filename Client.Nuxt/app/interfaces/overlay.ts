import type { Action } from "~/types/action";
import type { OverlayElement } from "./overlayElement";

export abstract class Overlay {
  abstract addElement(element: OverlayElement): void;
  abstract getElements(): OverlayElement[];
  abstract onElementsChange(handler: Action<[elements: OverlayElement[]]>): Action;
  abstract destroy(): void;
}