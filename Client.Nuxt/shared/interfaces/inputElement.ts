import { ViewElement } from "#shared/interfaces/viewElement";

export abstract class InputElement<V = any, D extends InputElementData<V> = InputElementData<V>> extends ViewElement {
  abstract name: string;
  
  abstract setValue(value: V): void
  abstract setData(data: D): void;
}