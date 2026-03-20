import type { FormElement } from "#shared/interfaces/formElement";

export abstract class FormElementFactory {
  abstract createElement(name: string, data: FormElementCreateData): FormElement
}