import { ViewElementBase } from "#shared/entities/viewElementBase";

let lastElementId = 0;

export abstract class OverlayElement extends ViewElementBase {
  readonly id = lastElementId++;
  
  abstract onClose(handler: Action): void;
  abstract destroy(): void;
}