import { UFormField } from "#components";
import { ViewElementBase } from "#shared/entities/viewElementBase";
import { ViewElement } from "#shared/interfaces/viewElement";
import { RenderFunction } from "#shared/types/renderFunction";
import type { FormFieldData } from "#shared/types/formFieldData";

export class FormField extends ViewElementBase
{
  private _label: string = "";
  private _name: string  = "";
  private _content: ViewElement | undefined;

  constructor(data?: FormFieldData)
  {
    super();

    if (data?.name)
    {
      this.setName(data.name);
    }

    if (data?.label)
    {
      this.setLabel(data.label);
    }
  }

  public get label(): string
  {
    return this._label;
  }

  public get name(): string
  {
    return this._name;
  }

  public setLabel(label: string): void
  {
    this._label = label;
  }

  public setName(name: string): void
  {
    this._name = name;
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
      label: this.label,
      name : this.name,
    }

    return () => h(UFormField, props, slots);
  }
}