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
import type { StringsService } from "~/interfaces/stringsService";
import type { ZonedDateTimeMapper } from "~/interfaces/zonedDateTimeMapper";
import type { TimeMapper } from "~/interfaces/timeMapper";

export class FormElementFactoryImpl implements FormElementFactory
{
  constructor(
    private datesService: DatesService,
    private stringsService: StringsService,
    private zonedDateTimeMapper: ZonedDateTimeMapper,
    private timeMapper: TimeMapper,
  )
  {
  }

  createElement(name: string, data: FormElementCreateData): FormElement
  {
    const inputElement = this.createInputElement(data.type);
    const formElement  = new FormElementBase(inputElement);

    formElement.setData({ ...data, name });

    return formElement;
  }

  private createInputElement(type: FormElementType): InputElement
  {
    switch (type)
    {
      case FormElementType.inputText:
        return new InputElementText(this.stringsService);
      case FormElementType.textarea:
        return new InputElementTextArea(this.stringsService);
      case FormElementType.inputDate:
        return new InputElementDate(this.zonedDateTimeMapper, this.stringsService);
      case FormElementType.inputTime:
        return new InputElementTime(this.timeMapper, this.stringsService);
      case FormElementType.inputDateTime:
        return new InputElementDateTime(this.datesService, this.stringsService, this.zonedDateTimeMapper, this.timeMapper);
    }
  }
}