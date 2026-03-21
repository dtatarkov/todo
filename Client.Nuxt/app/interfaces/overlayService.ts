import type { OverlayElement } from "@/entities/overlay/overlayElement";
import type { Action } from "~/types/action";

export abstract class OverlayService {
  abstract addElement(element: OverlayElement): void;
  abstract getElements(): OverlayElement[];
  abstract onElementsChange(handler: Action<[elements: OverlayElement[]]>): Action;
}