import { ViewElementBase } from "#shared/entities/viewElementBase";
import type { InputElement } from "#shared/entities/inputElement";

export abstract class FormElement<D extends FormElementData = FormElementData> extends ViewElementBase
{
  private _label: string = "";
  private _name: string = "";
  
  protected abstract inputElement: InputElement;

  constructor(data?: D)
  {
    super();

    if (data?.label)
    {
      this.setLabel(data.label);
    }

    if (data?.name)
    {
      this.setName(data.name);
    }
  }

  public get label(): string {
    return this._label;
  }

  public get name(): string {
    return this._name;
  }

  public setLabel(label: string): void {
    this._label = label;
  }

  public setName(name: string): void {
    this._name = name;
  }

  getRenderFunction(): () => object
  {
    return this.inputElement.getRenderFunction();
  }
}