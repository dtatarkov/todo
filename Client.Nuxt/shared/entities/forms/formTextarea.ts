import { FormElementBase } from "#shared/entities/forms/formElementBase";
import { FormTextareaData } from "#shared/types/formTextareaData";
import { InputElementBase } from "#shared/entities/inputElements/inputElementBase";
import { InputElementTextArea } from "#shared/entities/inputElements/inputElementTextarea";
import { FormElementType } from "#shared/enums/formElementType";

export class FormTextArea extends FormElementBase<FormTextareaData> {
  static type = FormElementType.textarea;
  
  protected override createInputElement(data?: FormTextareaData): InputElementBase<string> {
    return new InputElementTextArea(data);
  }
}