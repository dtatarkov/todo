import { InputTextData } from "#shared/types/inputTextData";
import { FormElementType } from "#shared/enums/formElementType";

export type FormElementCreateData = InputTextData & { type: FormElementType.inputText }