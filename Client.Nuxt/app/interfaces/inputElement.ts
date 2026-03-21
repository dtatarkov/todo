import { ViewElement } from "@/interfaces/viewElement";
import type { InputElementData } from "~/types/inputElementData";

export abstract class InputElement<V = any, D extends InputElementData<V> = InputElementData<V>> extends ViewElement {
  abstract name: string;
  abstract value: V;
  
  abstract setValue(value: V): void
  abstract setData(data?: Partial<D>): void;
}