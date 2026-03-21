import type { FormElementCreateData } from "@/types/formElementCreateData";
import { ViewElement } from "@/interfaces/viewElement";

export abstract class Form<TEntity extends Record<string, any> = Record<string, any>> extends ViewElement {
  abstract setData(data: Record<string, any>): void
  abstract setElements(elements: Partial<Record<keyof TEntity, FormElementCreateData>>): void
}