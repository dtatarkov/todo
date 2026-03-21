import { OverlayElement } from "~/interfaces/overlayElement";
import { AsViewElement } from "~/mixins/asViewElement";

let lastElementId = 0;

export abstract class OverlayElementBase extends AsViewElement(OverlayElement) {
  readonly id = lastElementId++;
}