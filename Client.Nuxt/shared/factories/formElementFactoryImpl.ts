import { FormElementFactory } from "#shared/interfaces/formElementFactory";
import { FormElementCreateData } from "#shared/types/formElementCreateData";
import { FormElementBase } from "#shared/entities/forms/formElementBase";
import { FormElementCreateDataWithName } from "../types/formElementCreateDataWithName";
import type { FormElement } from "#shared/interfaces/formElement";
import { InputElementBase } from "#shared/entities/inputElements/inputElementBase";
import type { InputElement } from "#shared/interfaces/inputElement";

const inputElementModules = import.meta.glob("#shared/entities/inputElements/*.ts", { eager: true });

const inputElementClasses = Object.values(inputElementModules)
                                 .map((module: any) => Object.values(module)[0]) // Получаем класс из модуля
                                 .filter((cls: any) => cls.prototype instanceof InputElementBase && cls !== InputElementBase) as Constructor<InputElement, []>[];

export class FormElementFactoryImpl implements FormElementFactory
{
  createElement(name: string, data: FormElementCreateData): FormElement
  {
    const InputElementClass = inputElementClasses.find((cls) => cls.name.toLowerCase().replace('inputelement', '') == data.type);
    
    if (!InputElementClass)
    {
      throw new Error(`Element type ${ data.type } not found`);
    }
    
    const inputElement = new InputElementClass();
    const formElement = new FormElementBase(inputElement);
    
    formElement.setData({ name, ...data } as FormElementCreateDataWithName);

    return formElement;
  }

}