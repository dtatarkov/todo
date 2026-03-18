import { UTextarea } from "#components";
import { FormElementType } from "#shared/enums/formElementType";
import { InputElementTextareaData } from "#shared/types/inputElementTextareaData";
import type { InputElementTextData } from "#shared/types/inputElementTextData";
import { InputElementBaseString } from "#shared/entities/inputElements/inputElementBaseString";

export class InputElementTextArea extends InputElementBaseString<InputElementTextareaData> {
  static readonly type = FormElementType.textarea;

  override getRenderFunction(): () => object {
    return () => h(UTextarea, this.getProps());
  }

  public get placeholder(): string {
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