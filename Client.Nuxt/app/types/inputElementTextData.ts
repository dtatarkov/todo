import type { InputElementData } from "@/types/inputElementData";

export type InputElementTextData = InputElementData<string> & {
  placeholder: string;
}