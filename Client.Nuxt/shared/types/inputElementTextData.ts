import { InputElementData } from "#shared/types/inputElementData";

export type InputElementTextData = InputElementData & {
  value?: string;
  placeholder?: string;
}