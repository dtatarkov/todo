import { FormElementFactory } from "@/interfaces/formElementFactory";
import type { FormElementCreateData } from "@/types/formElementCreateData";
import { FormElementBase } from "@/entities/forms/formElementBase";
import type { FormElement } from "@/interfaces/formElement";
import type { InputElement } from "@/interfaces/inputElement";
import type { DatesService } from "~/interfaces/datesService";
import { FormElementType } from "~/enums/formElementType";
import { InputElementText } from "~/entities/inputElements/inputElementText";
import { InputElementTextArea } from "~/entities/inputElements/inputElementTextarea";
import { InputElementTime } from "~/entities/inputElements/inputElementTime";
import { InputElementDateTime } from "~/entities/inputElements/inputElementDateTime";
import { InputElementDate } from "~/entities/inputElements/inputElementDate";

export class FormElementFactoryImpl implements FormElementFactory
{
  constructor(
    private datesService: DatesService
  )
  {
  }

  createElement(name: string, data: FormElementCreateData): FormElement
  {
    const inputElement = this.createInputElement(data.type);
    const formElement  = new FormElementBase(inputElement);

    formElement.setData({ name, ...data });

    return formElement;
  }

  private createInputElement(type: FormElementType): InputElement
  {
    switch (type)
    {
      case FormElementType.inputText:
        return new InputElementText();
      case FormElementType.textarea:
        return new InputElementTextArea();
      case FormElementType.inputDate:
        return new InputElementDate();
      case FormElementType.inputTime:
        return new InputElementTime(this.datesService);
      case FormElementType.inputDateTime:
        return new InputElementDateTime(this.datesService);
    }
  }
}