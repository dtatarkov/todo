import { InputElementData } from "#shared/types/inputElementData";
import { InputElement } from "#shared/entities/inputElements/inputElement";

export abstract class InputElementBaseString<D extends InputElementData<string> = InputElementData<string>> extends InputElement<string, D> {
  protected override getDefaultData(): D {
    return {
      ...super.getDefaultData(),
      
      value: ''
    }
  }
}