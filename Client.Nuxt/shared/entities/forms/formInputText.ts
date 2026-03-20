import { FormElementBase } from "#shared/entities/forms/formElementBase";
import type { FormInputTextData } from "#shared/types/formInputTextData";
import { InputElementText } from "#shared/entities/inputElements/inputElementText";
import  { type InputElementBase } from "#shared/entities/inputElements/inputElementBase";
import { FormElementType } from "#shared/enums/formElementType";

export class FormInputText extends FormElementBase<FormInputTextData> {
  static type = FormElementType.inputText;
  
  protected override createInputElement(data?: FormInputTextData): InputElementBase
  {
    return new InputElementText(data);
  }
}