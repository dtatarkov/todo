import type { ViewElement } from "~/interfaces/viewElement";
import { OverlayElement } from "~/interfaces/overlayElement";

export abstract class Modal extends OverlayElement {
  abstract title: string;
  abstract description: string;
  abstract content: ViewElement | undefined;

  abstract close(): void;
}