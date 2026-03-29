import { UIElement } from "~/interfaces/uiElement";

export abstract class InputElement<V = any> extends UIElement<string>
{
  abstract override id: string;
  abstract name: string;
  abstract autofocus: boolean;
  abstract value: V;
}