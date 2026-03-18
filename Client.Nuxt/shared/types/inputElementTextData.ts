import { InputElementData } from "#shared/types/inputElementData";

export type InputElementTextData = InputElementData<string> & {
  placeholder: string;
}