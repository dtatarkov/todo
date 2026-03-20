import { ViewElementBase } from "#shared/entities/viewElementBase";
import { FormField } from "#shared/entities/forms/formField";
import type { RenderFunction } from "#shared/types/renderFunction";
import type { InputElement } from "#shared/interfaces/inputElement";
import { FormElementCreateDataWithName } from "#shared/types/formElementCreateDataWithName";

export class FormElementBase<V = any, D extends InputElementData = InputElementData> extends ViewElementBase implements FormElementBase<V, D>
{
  protected formField = new FormField();

  constructor(protected inputElement: InputElement<V, D>)
  {
    super();
    
    this.formField.setContent(inputElement);
  }
  
  setData(data: FormElementCreateDataWithName): void {
    this.formField.setData(data);
    this.inputElement.setData(data as unknown as D);
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
}