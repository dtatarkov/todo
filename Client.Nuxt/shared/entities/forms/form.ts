import { UForm } from "#components";
import { ViewElementBase } from "#shared/entities/viewElementBase";
import { FormElement } from "#shared/entities/forms/formElement";
import type { FormElementCreateData } from "#shared/types/formElementCreateData";
import { FormInputText } from "#shared/entities/forms/formInputText";
import type { RenderFunction } from "#shared/types/renderFunction";
import { FormTextArea } from "#shared/entities/forms/formTextarea";
import { FormElementType } from "#shared/enums/formElementType";
import { FormInputDate } from "#shared/entities/forms/formInputDate";
import { FormElementCreateDataWithName } from "#shared/types/formElementCreateDataWithName";

export class Form<TEntity extends Record<string, any> = Record<string, any>> extends ViewElementBase
{
  private elements: FormElement[] = [];

  setData(data: Record<string, any>)
  {
    for (const element of this.elements)
    {
      if (element.name in data)
      {
        element.setValue(data[element.name]);
      }
    }
  }

  setElements(elements: Partial<Record<keyof TEntity, FormElementCreateData>>)
  {
    this.elements = Object.entries(elements).map(([name, createData]) =>
    {
      const element = this.createElement({ name, ...createData } as FormElementCreateDataWithName);

      return element;
    });
  }

  override getRenderFunction(): RenderFunction
  {
    return () => h(UForm, {
      class: 'p-4 flex flex-col gap-4'
    }, {
      default: () => this.elements.map(element => element.getRenderFunction()())
    });
  }

  private createElement(data: FormElementCreateDataWithName): FormElement
  {
    switch (data.type)
    {
      case FormElementType.inputText:
        return new FormInputText(data);
      case FormElementType.textarea:
        return new FormTextArea(data);
      case FormElementType.inputDate:
        return new FormInputDate(data);
      default:
        throw new Error(`Unknown form element type: ${ data.type }`);
    }
  }
}
