import { InputElementBase } from "@/entities/inputElements/inputElementBase";

export abstract class InputElementBaseString extends InputElementBase<string>
{
  constructor()
  {
    super();

    Object.assign(this.data, { value: '' });
  }
}