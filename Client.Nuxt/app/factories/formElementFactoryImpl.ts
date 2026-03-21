import { FormElementFactory } from "@/interfaces/formElementFactory";
import type { FormElementCreateData } from "@/types/formElementCreateData";
import { FormElementBase } from "@/entities/forms/formElementBase";
import type { FormElement } from "@/interfaces/formElement";
import { InputElementBase } from "@/entities/inputElements/inputElementBase";
import type { InputElement } from "@/interfaces/inputElement";
import type { Constructor } from "@/types/constructor";

const inputElementModules = import.meta.glob("@/entities/inputElements/*.ts", { eager: true });

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
    
    formElement.setData({ name, ...data });

    return formElement;
  }

}