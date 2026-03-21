import type { InputElementData } from "~/types/inputElementData";

export type InputElementTextareaData = InputElementData<string> & {
  placeholder: string;
};