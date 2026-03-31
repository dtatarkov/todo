export abstract class InputElement<V = any> extends UIElement<string> implements InputElementData<V>
{
  abstract override id: string;
  abstract name: string;
  abstract autofocus: boolean;
  abstract value: V;
}