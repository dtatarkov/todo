import { FormFieldBase } from "~/entities/forms/formFieldBase";
import type { InputElement } from "@/interfaces/inputElement";
import type { FormElementCreateDataWithName } from "@/types/formElementCreateDataWithName";
import type { InputElementData } from "~/types/inputElementData";
import { FormElement } from "~/interfaces/formElement";
import { UIElementId } from "~/entities/uiElementId";

export class FormElementBase<V = any, D extends InputElementData = InputElementData> extends FormElement
{
  private _id = new UIElementId();

  protected formField = new FormFieldBase();

  constructor(protected inputElement: InputElement<V, D>)
  {
    super();

    this.formField.content = inputElement;
  }

  get id()
  {
    return this._id.value;
  }

  get name()
  {
    return this.inputElement.name;
  }

  override get component()
  {
    return this.formField.component;
  }

  setValue(value: V): void
  {
    this.inputElement.setValue(value);
  }

  setData(data: FormElementCreateDataWithName): void
  {
    updatePropertiesWithData(this.formField, data);
    this.inputElement.setData(data as unknown as D);
  }
}