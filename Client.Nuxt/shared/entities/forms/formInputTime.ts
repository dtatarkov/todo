import { FormElementBase } from "#shared/entities/forms/formElementBase";
import { InputElement } from "#shared/entities/inputElements/inputElement";
import { FormElementType } from "#shared/enums/formElementType";
import { FormInputTimeData } from "#shared/types/formInputTimeData";
import { InputElementTime } from "#shared/entities/inputElements/inputElementTime";

export class FormInputTime extends FormElementBase<FormInputTimeData> {
  static type = FormElementType.inputTime;
  
  protected override createInputElement(data?: FormInputTimeData): InputElement {
    return new InputElementTime(data);
  }
}