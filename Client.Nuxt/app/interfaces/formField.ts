import type { FormFieldData } from "~/types/formFieldData";
import { ViewElement } from "~/interfaces/viewElement";

export abstract class FormField extends ViewElement {
  abstract setData(data: Partial<FormFieldData>): void
  abstract setContent(content: ViewElement): void
}