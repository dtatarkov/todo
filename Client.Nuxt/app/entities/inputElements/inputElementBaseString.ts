import type { InputElementData } from "@/types/inputElementData";
import { InputElementBase } from "@/entities/inputElements/inputElementBase";

export abstract class InputElementBaseString<D extends InputElementData<string> = InputElementData<string>> extends InputElementBase<string, D> {
  protected override getDefaultData(): D {
    return {
      ...super.getDefaultData(),
      
      value: ''
    }
  }
}