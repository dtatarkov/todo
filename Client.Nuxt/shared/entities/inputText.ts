import { UInput } from "#components";
import { FormElement } from "#shared/entities/formElement";
import { InputTextData } from "../types/inputTextData";

export class InputText extends FormElement
{
  static readonly type = 'input-text';

  private data: InputTextData;

  constructor(data?: InputTextData) {
    super();

    this.data = {
      ...data
    };
  }

  setLabel(label: string) {
    this.data.label = label;
  }

  setValue(value: string) {
    this.data.value = value;
  }

  setName(name: string) {
    this.data.name = name;
  }

  setPlaceholder(placeholder: string) {
    this.data.placeholder = placeholder;
  }

  setAutofocus(autofocus: boolean) {
    this.data.autofocus = autofocus;
  }

  override getRenderFunction(): () => object {
    return () => h(UInput, {
      label: this.data.label,
      modelValue: this.data.value,
      name: this.data.name,
      placeholder: this.data.placeholder,
      autofocus: this.data.autofocus,

      'update:modelValue': (value: string) => {
        this.setValue(value);
      }
    });
  }
}
