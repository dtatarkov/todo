import { VFormField } from "#components";
import { ViewElement } from "@/interfaces/viewElement";
import type { RenderFunction } from "@/types/renderFunction";
import { FormField } from "~/interfaces/formField";
import { UIElementId } from "~/entities/uiElementId";

export class FormFieldBase extends FormField
{
  private _id = new UIElementId();

  private _data = reactive({
    label: '',
    name : '',
  });

  private _children = {
    content: <ViewElement | undefined>undefined
  }

  get id(): number
  {
    return this._id.value;
  }

  get label(): string
  {
    return this._data.label;
  }

  set label(value: string)
  {
    this._data.label = value;
  }

  get name(): string
  {
    return this._data.name;
  }

  set name(value: string)
  {
    this._data.name = value;
  }

  get content()
  {
    return this._children.content;
  }

  set content(value)
  {
    this._children.content = value;
  }

  override getVNode(): { setup: () => RenderFunction }
  {
    return {
      setup: () =>
      {
        return () => h(VFormField, { field: this });
      }
    }
  }
}