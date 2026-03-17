import { FormElement } from "#shared/entities/formElement";
import type { FormInputTextData } from "#shared/types/formInputTextData";
import { InputElementText } from "#shared/entities/inputElementText";
import  { type InputElement } from "#shared/entities/inputElement";

export class FormInputText extends FormElement<FormInputTextData> { 
  protected override createInputElement(data?: FormInputTextData): InputElement
  {
    return new InputElementText(data);
  }
}