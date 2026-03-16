import type { OverlayElement } from "#shared/entities/overlayElement";

export abstract class Overlay {
  abstract addElement(element: OverlayElement): void;
  abstract getElements(): OverlayElement[];
  abstract onElementsChange(handler: Action<[elements: OverlayElement[]]>): Action;
  abstract destroy(): void;
}