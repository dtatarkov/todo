import { UTextarea } from "#components";
import { FormElementType } from "#shared/enums/formElementType";
import { InputElement } from "#shared/entities/inputElements/inputElement";
import { InputElementTextareaData } from "#shared/types/inputElementTextareaData";

export class InputElementTextArea extends InputElement<string> {
  static readonly type = FormElementType.textarea;

  private _value: string = '';
  private _placeholder: string = '';

  constructor(data?: InputElementTextareaData) {
    super(data);

    if (data?.value) {
      this.setValue(data.value);
    }

    if (data?.placeholder) {
      this.setPlaceholder(data.placeholder);
    }
  }

  override getRenderFunction(): () => object {
    return () => h(UTextarea, {
      modelValue: this.value,
      name: this.name,
      placeholder: this.placeholder,
      autofocus: this.autofocus,
      class: this.getCssClasses(),

      'update:modelValue': (value: string) => {
        this.setValue(value);
      }
    });
  }

  public get value(): string {
    return this._value;
  }

  public get placeholder(): string {
    return this._placeholder;
  }

  public setValue(value: string): void {
    this._value = value;
  }

  public setPlaceholder(placeholder: string): void {
    this._placeholder = placeholder;
  }
}