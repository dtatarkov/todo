import { VForm } from "#components";
import type { FormElementCreateData } from "@/types/formElementCreateData";
import { Form } from "@/interfaces/form";
import { FormElementFactory } from "@/interfaces/formElementFactory";
import type { FormElement } from "@/interfaces/formElement";
import { UIElementId } from "~/entities/uiElementId";

export class FormBase<TEntity extends Record<string, any> = Record<string, any>> extends Form
{
  #id                           = new UIElementId('form');
  #elements: Ref<FormElement[]> = shallowRef([]);

  override component = {
    setup: () =>
    {
      return () => h(VForm, { form: this });
    }
  }

  constructor(
    protected formElementFactory: FormElementFactory
  )
  {
    super();
  }

  get id()
  {
    return this.#id.value;
  }

  get elements()
  {
    return this.#elements.value
  }

  setData(data: Record<string, any>)
  {
    for (const element of this.#elements.value)
    {
      if (element.name in data)
      {
        element.setValue(data[element.name]);
      }
    }
  }

  setElements(elements: Partial<Record<keyof TEntity, FormElementCreateData>>)
  {
    this.#elements.value = Object.entries(elements).map(([name, createData]) =>
    {
      const element = this.formElementFactory.createElement(name, createData as FormElementCreateData);

      return element;
    });
  }
}
