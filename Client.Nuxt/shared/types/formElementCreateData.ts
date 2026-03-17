import { FormInputTextData } from "#shared/types/formInputTextData";
import { FormElementType } from "#shared/enums/formElementType";

export type FormElementCreateData = FormInputTextData & { type: FormElementType.inputText }