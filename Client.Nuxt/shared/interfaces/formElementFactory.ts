import { FormElement } from "#shared/entities/forms/formElement";

export abstract class FormElementFactory {
  abstract createElement(name: string, data: FormElementCreateData): FormElement
}