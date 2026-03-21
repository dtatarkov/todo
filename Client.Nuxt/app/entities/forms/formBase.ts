import { UForm } from "#components";
import type { FormElementCreateData } from "@/types/formElementCreateData";
import type { RenderFunction } from "@/types/renderFunction";
import { Form } from "@/interfaces/form";
import { FormElementFactory } from "@/interfaces/formElementFactory";
import type { FormElement } from "@/interfaces/formElement";
import { AsViewElement } from "~/mixins/asViewElement";

export class FormBase<TEntity extends Record<string, any> = Record<string, any>> extends AsViewElement(Form)
{
  private elements: FormElement[] = [];
  
  constructor(
    protected formElementFactory: FormElementFactory
  )
  {
    super();
  }

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
      const element = this.formElementFactory.createElement(name, createData as FormElementCreateData);

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
}
