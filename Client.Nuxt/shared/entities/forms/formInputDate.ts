import { FormInputDateData } from "#shared/types/formInputDateData";
import { FormElement } from "#shared/entities/forms/formElement";
import { InputElement } from "#shared/entities/inputElements/inputElement";
import { InputElementDate } from "#shared/entities/inputElements/inputElementDate";
import { FormElementType } from "#shared/enums/formElementType";

export class FormInputDate extends FormElement<FormInputDateData> {
  static type = FormElementType.inputDate;
  
  protected override createInputElement(data?: FormInputDateData): InputElement {
    return new InputElementDate(data);
  }
}