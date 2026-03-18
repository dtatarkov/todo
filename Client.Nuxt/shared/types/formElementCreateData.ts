import { FormElementType } from "#shared/enums/formElementType";
import type { FormInputDateData } from "#shared/types/formInputDateData";

type ExcludeName<T> = Omit<T, 'name'>

export type FormElementCreateData = 
  ExcludeName<{ type: FormElementType.inputText } & FormInputTextData> |
  ExcludeName<{ type: FormElementType.inputDate } & FormInputDateData> |
  ExcludeName<{ type: FormElementType.textarea } & FormTextareaData>