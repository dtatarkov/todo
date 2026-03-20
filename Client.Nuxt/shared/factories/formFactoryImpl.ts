import { Form } from "#shared/interfaces/form";
import { FormBase } from "#shared/entities/forms/formBase";
import { FormElementFactory } from "#shared/interfaces/formElementFactory";
import { FormFactory } from "#shared/interfaces/formFactory";

export class FormFactoryImpl implements FormFactory
{
  constructor(protected formElementFactory: FormElementFactory)
  {
  }

  create<TEntity extends Record<string, any> = Record<string, any>>(): Form<TEntity>
  {
    return new FormBase(this.formElementFactory);
  }
}