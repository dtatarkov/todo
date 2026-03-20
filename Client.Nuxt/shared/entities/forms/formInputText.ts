import { FormElement } from "#shared/entities/forms/formElement";
import type { FormInputTextData } from "#shared/types/formInputTextData";
import { InputElementText } from "#shared/entities/inputElements/inputElementText";
import  { type InputElement } from "#shared/entities/inputElements/inputElement";
import { FormElementType } from "#shared/enums/formElementType";

export class FormInputText extends FormElement<FormInputTextData> {
  static type = FormElementType.inputText;
  
  protected override createInputElement(data?: FormInputTextData): InputElement
  {
    return new InputElementText(data);
  }
}