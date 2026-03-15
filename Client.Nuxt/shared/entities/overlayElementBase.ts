import { OverlayElement } from "#shared/interfaces/overlayElement";

let lastElementId = 0;

export abstract class OverlayElementBase extends OverlayElement {
  readonly id = lastElementId++;
}