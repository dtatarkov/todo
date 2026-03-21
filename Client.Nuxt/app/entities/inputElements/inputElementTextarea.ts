import { UTextarea } from "#components";
import { FormElementType } from "@/enums/formElementType";
import type { InputElementTextareaData } from "@/types/inputElementTextareaData";
import { InputElementBaseString } from "@/entities/inputElements/inputElementBaseString";
import { InputElementWithPlaceholder } from "~/mixins/inputElementWithPlaceholder";

export class InputElementTextArea extends InputElementWithPlaceholder(InputElementBaseString<InputElementTextareaData>) {
  static readonly type = FormElementType.textarea;

  override getRenderFunction(): () => object {
    return () => h(<any>UTextarea, this.getProps());
  }
}