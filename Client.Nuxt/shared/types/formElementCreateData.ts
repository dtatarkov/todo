import { FormInputTextData } from "#shared/types/formInputTextData";
import { FormElementType } from "#shared/enums/formElementType";
import type { FormTextareaData } from "#shared/types/formTextareaData";

export type FormElementCreateData = FormInputTextData & { type: FormElementType.inputText } |
  FormTextareaData & { type: FormElementType.textarea };