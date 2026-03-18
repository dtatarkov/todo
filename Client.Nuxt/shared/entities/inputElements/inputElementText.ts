import { UInput } from "#components";
import { FormElementType } from "#shared/enums/formElementType";
import type { InputElementTextData } from "#shared/types/inputElementTextData";
import { InputElementBaseString } from "#shared/entities/inputElements/inputElementBaseString";

export class InputElementText extends InputElementBaseString<InputElementTextData>
{
  static readonly type = FormElementType.inputText;
  
  override getRenderFunction(): () => object
  {
    return () => h(UInput, this.getProps());
  }  
  
  public get placeholder(): string
  {
    return this.data.placeholder;
  }  
  
  protected override getDefaultData(): InputElementTextData
  {
    return {
      ...super.getDefaultData(),
      
      placeholder: ''
    }
  }
}
