import { UIElement } from "~/interfaces/uiElement";

export abstract class InputElement<V = any> extends UIElement<string>
{
  abstract value: V;

  abstract setData(data: Record<string, any>): void;
}