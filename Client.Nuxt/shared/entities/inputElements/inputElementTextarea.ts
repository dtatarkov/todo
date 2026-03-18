import { UTextarea } from "#components";
import { FormElementType } from "#shared/enums/formElementType";
import { InputElementTextareaData } from "#shared/types/inputElementTextareaData";
import { InputElementBaseString } from "#shared/entities/inputElements/inputElementBaseString";
import { InputElementWithPlaceholder } from "#shared/entities/inputElements/mixins/inputElementWithPlaceholder";

export class InputElementTextArea extends InputElementWithPlaceholder(InputElementBaseString<InputElementTextareaData>) {
  static readonly type = FormElementType.textarea;

  override getRenderFunction(): () => object {
    return () => h(UTextarea, this.getProps());
  }
}