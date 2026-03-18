import { UInput } from "#components";
import { FormElementType } from "#shared/enums/formElementType";
import type { InputElementTextData } from "#shared/types/inputElementTextData";
import { InputElementBaseString } from "#shared/entities/inputElements/inputElementBaseString";
import { InputElementWithPlaceholder } from "#shared/entities/inputElements/mixins/inputElementWithPlaceholder";

export class InputElementText extends InputElementWithPlaceholder(InputElementBaseString<InputElementTextData>)
{
  static readonly type = FormElementType.inputText;
  
  override getRenderFunction(): () => object
  {
    return () => h(UInput, this.getProps());
  }
}