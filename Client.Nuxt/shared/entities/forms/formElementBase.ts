import { ViewElementBase } from "#shared/entities/viewElementBase";
import type { InputElement } from "#shared/entities/inputElements/inputElement";
import { FormField } from "#shared/entities/forms/formField";
import type { RenderFunction } from "#shared/types/renderFunction";

export abstract class FormElementBase<V = any, D extends FormElementData = FormElementData> extends ViewElementBase implements FormElementBase<V>
{
  protected inputElement: InputElement<V>;
  protected formField: FormField;

  constructor(data?: D)
  {
    super();
    
    this.formField = new FormField(data);
    this.inputElement = this.createInputElement(data);
    
    this.formField.setContent(this.inputElement);
  }
  
  get name() {
    return this.inputElement.name;
  }

  setValue(value: V): void {
    this.inputElement.setValue(value);
  }

  getRenderFunction(): RenderFunction
  {
    return this.formField.getRenderFunction();
  }
  
  protected abstract createInputElement(data?: D): InputElement;
}