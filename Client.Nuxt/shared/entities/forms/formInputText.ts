import { FormElement } from "#shared/entities/forms/formElement";
import type { FormInputTextData } from "#shared/types/formInputTextData";
import { InputElementText } from "#shared/entities/inputElements/inputElementText";
import  { type InputElement } from "#shared/entities/inputElements/inputElement";

export class FormInputText extends FormElement<FormInputTextData> { 
  protected override createInputElement(data?: FormInputTextData): InputElement
  {
    return new InputElementText(data);
  }
}