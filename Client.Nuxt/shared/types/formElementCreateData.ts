import { FormElementType } from "#shared/enums/formElementType";

export type FormElementCreateData = 
  ({ type: FormElementType.inputText } & FormInputTextData) |
  ({ type: FormElementType.textarea } & FormTextareaData);