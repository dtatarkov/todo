import { FormElementType } from "@/enums/formElementType";
import type { FormElementData } from "~/types/formElementData";
import type { InputElementTextData } from "~/types/inputElementTextData";
import type { InputElementDateData } from "~/types/InputElementDateData";
import type { InputElementTimeData } from "~/types/inputElementTimeData";
import type { InputElementTextareaData } from "~/types/inputElementTextareaData";

type ExcludeName<T> = Omit<T, 'name'>

export type FormElementCreateData = 
  ExcludeName<{ type: FormElementType.inputText } & FormElementData & Partial<InputElementTextData>> |
  ExcludeName<{ type: FormElementType.inputDate } & FormElementData & Partial<InputElementDateData>> |
  ExcludeName<{ type: FormElementType.inputTime } & FormElementData & Partial<InputElementTimeData>> |
  ExcludeName<{ type: FormElementType.textarea } & FormElementData & Partial<InputElementTextareaData>>