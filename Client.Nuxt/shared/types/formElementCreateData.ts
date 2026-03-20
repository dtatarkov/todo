import { FormElementType } from "#shared/enums/formElementType";
import type { FormInputDateData } from "#shared/types/formInputDateData";
import type { FormInputTimeData } from "#shared/types/formInputTimeData";

type ExcludeName<T> = Omit<T, 'name'>

export type FormElementCreateData = 
  ExcludeName<{ type: FormElementType.inputText } & FormInputTextData> |
  ExcludeName<{ type: FormElementType.inputDate } & FormInputDateData> |
  ExcludeName<{ type: FormElementType.inputTime } & FormInputTimeData> |
  ExcludeName<{ type: FormElementType.textarea } & FormTextareaData>