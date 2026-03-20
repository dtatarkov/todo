import { UForm } from "#components";
import { ViewElementBase } from "#shared/entities/viewElementBase";
import type { FormElementCreateData } from "#shared/types/formElementCreateData";
import type { RenderFunction } from "#shared/types/renderFunction";
import { Form } from "#shared/interfaces/form";
import { FormElementFactory } from "#shared/interfaces/formElementFactory";
import type { FormElement } from "#shared/interfaces/formElement";

export class FormBase<TEntity extends Record<string, any> = Record<string, any>> extends ViewElementBase implements Form
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
