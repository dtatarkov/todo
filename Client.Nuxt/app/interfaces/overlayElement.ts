import type { Action } from "~/types/action";
import { ViewElement } from "~/interfaces/viewElement";

export abstract class OverlayElement extends ViewElement {
  abstract id: number;
  
  abstract onClose(handler: Action): void;
}