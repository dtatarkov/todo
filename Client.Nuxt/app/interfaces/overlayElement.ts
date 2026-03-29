import { UIElement } from "~/interfaces/uiElement";
import type { Overlay } from "~/interfaces/overlay";

export abstract class OverlayElement extends UIElement<string>
{
  abstract parent: Overlay | undefined;
}