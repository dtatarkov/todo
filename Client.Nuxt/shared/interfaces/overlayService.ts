import { OverlayElement } from "#shared/interfaces/overlayElement";

export abstract class OverlayService {
  abstract getElements(): OverlayElement[];
  abstract subscribeToElementChanges(handler: Action): void;
  abstract unsubscribeFromElementChanges(handler: Action): void;
}