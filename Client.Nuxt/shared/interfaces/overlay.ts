import { OverlayElement } from "#shared/interfaces/overlayElement";
import type { Observable } from "#shared/models/observable";

export abstract class Overlay {
  abstract getElements(): Observable<OverlayElement[]>;
  abstract destroy(): void;
}