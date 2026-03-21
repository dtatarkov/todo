import { ViewElementBase } from "@/entities/viewElementBase";
import { FormField } from "@/entities/forms/formField";
import type { RenderFunction } from "@/types/renderFunction";
import type { InputElement } from "@/interfaces/inputElement";
import type { FormElementCreateDataWithName } from "@/types/formElementCreateDataWithName";
import type { InputElementData } from "~/types/inputElementData";

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