import { UInput } from "#components";
import { FormElementType } from "#shared/enums/formElementType";
import { InputElement } from "#shared/entities/inputElement";
import type { InputElementTextData } from "#shared/types/inputElementTextData";

export class InputElementText extends InputElement
{
  static readonly type = FormElementType.inputText;

  private _value: string       = '';
  private _placeholder: string = '';
  

  constructor(data?: InputElementTextData)
  {
    super(data);

    if (data?.value)
    {
      this.setValue(data.value);
    }

    if (data?.placeholder)
    {
      this.setPlaceholder(data.placeholder);
    }
  }

  override getRenderFunction(): () => object
  {
    return () => h(UInput, {
      modelValue : this.value,
      name       : this.name,
      placeholder: this.placeholder,
      autofocus  : this.autofocus,

      'update:modelValue': (value: string) =>
      {
        this.setValue(value);
      }
    });
  }

  public get value(): string
  {
    return this._value;
  }

  public get placeholder(): string
  {
    return this._placeholder;
  }

  public setValue(value: string): void
  {
    this._value = value;
  }

  public setPlaceholder(placeholder: string): void
  {
    this._placeholder = placeholder;
  }
}
