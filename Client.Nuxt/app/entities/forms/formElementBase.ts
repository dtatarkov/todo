import { FormFieldBase } from "~/entities/forms/formFieldBase";
import type { RenderFunction } from "@/types/renderFunction";
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

    this.formField.setContent(inputElement);
  }

  get id()
  {
    return this._id.value;
  }

  setData(data: FormElementCreateDataWithName): void
  {
    this.formField.setData(data);
    this.inputElement.setData(data as unknown as D);
  }

  get name()
  {
    return this.inputElement.name;
  }

  setValue(value: V): void
  {
    this.inputElement.setValue(value);
  }

  override getVNode(): { setup: () => RenderFunction }
  {
    return this.formField.getVNode();
  }
}