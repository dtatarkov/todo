import { ViewElement } from "@/interfaces/viewElement";

export abstract class FormElement<V = any> extends ViewElement {
  abstract name: string;
  
  abstract setValue(value: V): void
}