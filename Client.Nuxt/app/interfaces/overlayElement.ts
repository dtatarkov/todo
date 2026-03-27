import { UIElement } from "~/interfaces/uiElement";
import type { Overlay } from "~/interfaces/overlay";

export abstract class OverlayElement extends UIElement {
  abstract readonly id: number;
  
  abstract parent: Overlay | undefined;
}