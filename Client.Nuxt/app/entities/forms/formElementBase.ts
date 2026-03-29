import { FormFieldBase } from "~/entities/forms/formFieldBase";
import type { InputElement } from "@/interfaces/inputElement";
import type { FormElementCreateDataWithName } from "@/types/formElementCreateDataWithName";
import { FormElement } from "~/interfaces/formElement";
import { UIElementId } from "~/entities/uiElementId";

export class FormElementBase<V = any> extends FormElement
{
  #id = new UIElementId('form-element');

  protected formField = new FormFieldBase();

  constructor(protected inputElement: InputElement<V>)
  {
    super();

    this.formField.content = inputElement;
  }

  get id()
  {
    return this.#id.value;
  }

  get name()
  {
    return this.formField.name;
  }

  override get component()
  {
    return this.formField.component;
  }

  setValue(value: V): void
  {
    this.inputElement.value = value;
  }

  setData(data: FormElementCreateDataWithName): void
  {
    updatePropertiesWithData(this.formField, data);
    updatePropertiesWithData(this.inputElement, data);
  }
}