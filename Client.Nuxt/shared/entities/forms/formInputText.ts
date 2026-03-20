import { FormElementBase } from "#shared/entities/forms/formElementBase";
import type { FormInputTextData } from "#shared/types/formInputTextData";
import { InputElementText } from "#shared/entities/inputElements/inputElementText";
import  { type InputElement } from "#shared/entities/inputElements/inputElement";
import { FormElementType } from "#shared/enums/formElementType";

export class FormInputText extends FormElementBase<FormInputTextData> {
  static type = FormElementType.inputText;
  
  protected override createInputElement(data?: FormInputTextData): InputElement
  {
    return new InputElementText(data);
  }
}