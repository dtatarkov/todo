import { ViewElementBase } from "#shared/entities/viewElementBase";
import type { InputElementBase } from "#shared/entities/inputElements/inputElementBase";
import { FormField } from "#shared/entities/forms/formField";
import type { RenderFunction } from "#shared/types/renderFunction";

export abstract class FormElementBase<V = any, D extends FormElementData = FormElementData> extends ViewElementBase implements FormElementBase<V>
{
  protected inputElement: InputElementBase<V>;
  protected formField = new FormField();

  constructor(data?: D)
  {
    super();
    
    this.inputElement = this.createInputElement(data);

    if(data)
    {
      this.formField.setData(data);
    }
    
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
  
  protected abstract createInputElement(data?: D): InputElementBase;
}