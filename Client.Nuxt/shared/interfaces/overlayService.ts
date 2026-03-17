import type { OverlayElement } from "#shared/entities/overlay/overlayElement";

export abstract class OverlayService {
  abstract addElement(element: OverlayElement): void;
  abstract getElements(): OverlayElement[];
  abstract onElementsChange(handler: Action<[elements: OverlayElement[]]>): Action;
}