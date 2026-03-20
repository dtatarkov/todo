import { FormElement } from "#shared/entities/forms/formElement";
import { InputElement } from "#shared/entities/inputElements/inputElement";
import { FormElementType } from "#shared/enums/formElementType";
import { FormInputTimeData } from "#shared/types/formInputTimeData";
import { InputElementTime } from "#shared/entities/inputElements/inputElementTime";

export class FormInputTime extends FormElement<FormInputTimeData> {
  static type = FormElementType.inputTime;
  
  protected override createInputElement(data?: FormInputTimeData): InputElement {
    return new InputElementTime(data);
  }
}