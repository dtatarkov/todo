import { ViewElementBase } from "#shared/entities/viewElementBase";
import type { InputElement } from "#shared/entities/inputElement";
import { FormField } from "#shared/entities/formField";
import type { RenderFunction } from "#shared/types/renderFunction";

export abstract class FormElement<D extends FormElementData = FormElementData> extends ViewElementBase
{
  protected inputElement: InputElement;
  protected formField: FormField;

  constructor(data?: D)
  {
    super();
    
    this.formField = new FormField(data);
    this.inputElement = this.createInputElement(data);
    
    this.formField.setContent(this.inputElement);
  }

  public get label(): string {
    return this.formField.label;
  }

  public get name(): string {
    return this.formField.name;
  }

  getRenderFunction(): RenderFunction
  {
    return this.formField.getRenderFunction();
  }
  
  protected abstract createInputElement(data?: D): InputElement;
}