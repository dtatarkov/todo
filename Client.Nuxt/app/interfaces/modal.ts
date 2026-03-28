import { OverlayElement } from "~/interfaces/overlayElement";
import type { UIElement } from "~/interfaces/uiElement";

export abstract class Modal extends OverlayElement
{
  abstract title: string;
  abstract description: string;
  abstract content: UIElement | undefined;

  abstract close(): void;
}