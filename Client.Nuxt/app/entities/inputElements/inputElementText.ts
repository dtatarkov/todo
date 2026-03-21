import { UInput } from "#components";
import { FormElementType } from "@/enums/formElementType";
import type { InputElementTextData } from "@/types/inputElementTextData";
import { InputElementBaseString } from "@/entities/inputElements/inputElementBaseString";
import { InputElementWithPlaceholder } from "~/mixins/inputElementWithPlaceholder";

export class InputElementText extends InputElementWithPlaceholder(InputElementBaseString<InputElementTextData>)
{
  static readonly type = FormElementType.inputText;
  
  override getRenderFunction(): () => object
  {
    return () => h(<any>UInput, this.getProps());
  }
}