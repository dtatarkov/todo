import type { FormElement } from "@/interfaces/formElement";

export abstract class FormElementFactory {
  abstract createElement(name: string, data: FormElementCreateData): FormElement
}