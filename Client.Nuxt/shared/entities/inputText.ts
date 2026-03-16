import { UInput } from "#components";
import { FormElement } from "#shared/entities/formElement";
import { InputTextData } from "../types/inputTextData";
import { FormElementType } from "#shared/enums/formElementType";

export class InputText extends FormElement<InputTextData>
{
  static readonly type = FormElementType.inputText;

  private _value: string       = '';
  private _placeholder: string = '';
  private _autofocus: boolean  = false;

  constructor(data?: InputTextData)
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

    if (data?.autofocus)
    {
      this.setAutofocus(data.autofocus);
    }
  }

  override getRenderFunction(): () => object
  {
    return () => h(UInput, {
      label      : this.label,
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

  public get autofocus(): boolean
  {
    return this._autofocus;
  }

  public setValue(value: string): void
  {
    this._value = value;
  }

  public setPlaceholder(placeholder: string): void
  {
    this._placeholder = placeholder;
  }

  public setAutofocus(autofocus: boolean): void
  {
    this._autofocus = autofocus;
  }
}
