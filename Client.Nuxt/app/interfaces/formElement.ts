import { UIElement } from "~/interfaces/uiElement";

export abstract class FormElement<V = any> extends UIElement<number>
{
  abstract name: string;

  abstract setValue(value: V): void
}