import { FormElementBase } from "#shared/entities/forms/formElementBase";
import { InputElementBase } from "#shared/entities/inputElements/inputElementBase";
import { FormElementType } from "#shared/enums/formElementType";
import { FormInputTimeData } from "#shared/types/formInputTimeData";
import { InputElementTime } from "#shared/entities/inputElements/inputElementTime";

export class FormInputTime extends FormElementBase<FormInputTimeData> {
  static type = FormElementType.inputTime;
  
  protected override createInputElement(data?: FormInputTimeData): InputElementBase {
    return new InputElementTime(data);
  }
}