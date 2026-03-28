import { ViewElement } from "~/interfaces/viewElement";
import { UIElement } from "~/interfaces/uiElement";

export abstract class FormField extends UIElement<number>
{
  abstract name: string;
  abstract label: string;
  abstract content: ViewElement | undefined;
}