import { ViewElementBase } from "#shared/entities/viewElementBase";

export abstract class OverlayElement extends ViewElementBase {
  abstract onClose(handler: Action): void;
  abstract destroy(): void;
}