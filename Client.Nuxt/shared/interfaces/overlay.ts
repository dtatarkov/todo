import type { OverlayElement } from "#shared/entities/overlay/overlayElement";

export abstract class Overlay {
  abstract addElement(element: OverlayElement): void;
  abstract getElements(): OverlayElement[];
  abstract onElementsChange(handler: Action<[elements: OverlayElement[]]>): Action;
  abstract destroy(): void;
}