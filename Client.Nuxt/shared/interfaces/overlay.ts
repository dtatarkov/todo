import type { Observable } from "#shared/models/observable";
import type { OverlayElement } from "#shared/entities/overlayElement";

export abstract class Overlay {
  abstract addElement(element: OverlayElement): void;
  abstract getElements(): Observable<OverlayElement[]>;
  abstract destroy(): void;
}