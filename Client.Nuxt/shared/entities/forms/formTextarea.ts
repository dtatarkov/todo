import { FormElementBase } from "#shared/entities/forms/formElementBase";
import { FormTextareaData } from "#shared/types/formTextareaData";
import { InputElement } from "#shared/entities/inputElements/inputElement";
import { InputElementTextArea } from "#shared/entities/inputElements/inputElementTextarea";
import { FormElementType } from "#shared/enums/formElementType";

export class FormTextArea extends FormElementBase<FormTextareaData> {
  static type = FormElementType.textarea;
  
  protected override createInputElement(data?: FormTextareaData): InputElement<string> {
    return new InputElementTextArea(data);
  }
}