import { ViewElementBase } from "@/entities/viewElementBase";
import type { Action } from "~/types/action";

let lastElementId = 0;

export abstract class OverlayElement extends ViewElementBase {
  readonly id = lastElementId++;
  
  abstract onClose(handler: Action): void;
  abstract destroy(): void;
}