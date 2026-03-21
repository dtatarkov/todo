import { UTextarea } from "#components";
import { FormElementType } from "@/enums/formElementType";
import { InputElementTextareaData } from "@/types/inputElementTextareaData";
import { InputElementBaseString } from "@/entities/inputElements/inputElementBaseString";
import { InputElementWithPlaceholder } from "@/entities/inputElements/mixins/inputElementWithPlaceholder";

export class InputElementTextArea extends InputElementWithPlaceholder(InputElementBaseString<InputElementTextareaData>) {
  static readonly type = FormElementType.textarea;

  override getRenderFunction(): () => object {
    return () => h(UTextarea, this.getProps());
  }
}