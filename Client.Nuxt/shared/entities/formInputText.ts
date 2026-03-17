import { FormElement } from "#shared/entities/formElement";
import type { FormInputTextData } from "#shared/types/formInputTextData";
import { InputElementText } from "#shared/entities/inputElementText";
import type { InputElement } from "#shared/entities/inputElement";

export class FormInputText extends FormElement<FormInputTextData> {
  protected inputElement: InputElement;
  
  constructor(data: FormInputTextData) {
    super(data);
    
    this.inputElement = new InputElementText(data);
  }  
}