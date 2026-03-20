import { FormElementFactory } from "#shared/interfaces/formElementFactory";
import { FormElementCreateData } from "#shared/types/formElementCreateData";
import { FormElementBase } from "#shared/entities/forms/formElementBase";
import { FormElementCreateDataWithName } from "../types/formElementCreateDataWithName";
import type { FormElement } from "#shared/interfaces/formElement";

// Динамический импорт всех классов форм
const formModules = import.meta.glob("#shared/entities/forms/*.ts", { eager: true });

// Фильтрация классов, которые наследуются от FormElement но не являются FormElement
const formElementClasses = Object.values(formModules)
                                 .map((module: any) => Object.values(module)[0]) // Получаем класс из модуля
                                 .filter((cls: any) => cls.prototype instanceof FormElementBase && cls !== FormElementBase) as Constructor<FormElementBase, [data: FormElementCreateDataWithName]>[];

export class FormElementFactoryImpl implements FormElementFactory
{
  createElement(name: string, data: FormElementCreateData): FormElement
  {
    const FormClass = formElementClasses.find((cls: any) => cls.type === data.type);
    
    if (!FormClass)
    {
      throw new Error(`Form element type ${ data.type } not found`);
    }

    return new FormClass({ name, ...data });
  }

}