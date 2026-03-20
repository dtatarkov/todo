import { FormElementFactory } from "#shared/interfaces/formElementFactory";
import { FormElementCreateData } from "#shared/types/formElementCreateData";
import { FormElement } from "#shared/entities/forms/formElement";
import { FormElementCreateDataWithName } from "../types/formElementCreateDataWithName";

// Динамический импорт всех классов форм
const formFolderClasses = import.meta.glob("#shared/entities/forms/*.ts", { eager: true });

// Фильтрация классов, которые наследуются от FormElement но не являются FormElement
const formElementClasses = Object.values(formFolderClasses)
                                 .map((cls: any) => Object.values(cls)[0]) // Получаем класс из модуля
                                 .filter((cls: any) => cls.prototype instanceof FormElement && cls !== FormElement) as Constructor<FormElement, [data: FormElementCreateDataWithName]>[];

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