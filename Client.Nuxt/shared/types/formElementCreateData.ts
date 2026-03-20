import { FormElementType } from "#shared/enums/formElementType";

type ExcludeName<T> = Omit<T, 'name'>

export type FormElementCreateData = 
  ExcludeName<{ type: FormElementType.inputText } & FormElementData & Partial<InputElementTextData>> |
  ExcludeName<{ type: FormElementType.inputDate } & FormElementData & Partial<InputElementDateData>> |
  ExcludeName<{ type: FormElementType.inputTime } & FormElementData & Partial<InputElementTimeData>> |
  ExcludeName<{ type: FormElementType.textarea } & FormElementData & Partial<InputElementTextareaData>>