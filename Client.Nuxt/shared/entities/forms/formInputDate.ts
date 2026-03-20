import { FormInputDateData } from "#shared/types/formInputDateData";
import { FormElementBase } from "#shared/entities/forms/formElementBase";
import { InputElement } from "#shared/entities/inputElements/inputElement";
import { InputElementDate } from "#shared/entities/inputElements/inputElementDate";
import { FormElementType } from "#shared/enums/formElementType";

export class FormInputDate extends FormElementBase<FormInputDateData> {
  static type = FormElementType.inputDate;
  
  protected override createInputElement(data?: FormInputDateData): InputElement {
    return new InputElementDate(data);
  }
}