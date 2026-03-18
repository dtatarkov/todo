import { FormElement } from "#shared/entities/forms/formElement";
import { FormTextareaData } from "#shared/types/formTextareaData";
import { InputElement } from "#shared/entities/inputElements/inputElement";
import { InputElementTextArea } from "#shared/entities/inputElements/inputElementTextarea";

export class FormTextArea extends FormElement<FormTextareaData> {
  protected override createInputElement(data?: FormTextareaData): InputElement<string> {
    return new InputElementTextArea(data);
  }
}