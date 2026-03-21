import { UFormField } from "#components";
import { ViewElement } from "@/interfaces/viewElement";
import type { RenderFunction } from "@/types/renderFunction";
import type { FormFieldData } from "@/types/formFieldData";
import { FormField } from "~/interfaces/formField";
import { AsViewElement } from "~/mixins/asViewElement";

export class FormFieldBase extends AsViewElement(FormField)
{
  private _data: FormFieldData = {
    label: '',
    name: '',
  };
  
  private _content: ViewElement | undefined;

  public setData(data: Partial<FormFieldData>): void
  {
    Object.assign(this._data, data);
  }

  public setContent(content: ViewElement): void
  {
    this._content = content;
  }

  override getRenderFunction(): RenderFunction
  {
    const slots: Record<string, RenderFunction> = {}

    if (this._content)
    {
      slots['default'] = this._content.getRenderFunction();
    }

    const props = {
      ...this._data,
      class: 'flex flex-col gap-1'
    }

    return () => h(UFormField, props, slots);
  }
}