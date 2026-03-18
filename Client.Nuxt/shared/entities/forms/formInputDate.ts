import { FormInputDateData } from "#shared/types/formInputDateData";
import { FormElement } from "#shared/entities/forms/formElement";
import { InputElement } from "#shared/entities/inputElements/inputElement";
import { InputElementDate } from "#shared/entities/inputElements/inputElementDate";

export class FormInputDate extends FormElement<FormInputDateData> {
  protected override createInputElement(data?: FormInputDateData): InputElement {
    return new InputElementDate(data);
  }
}