import { ViewElementBase } from "#shared/entities/viewElementBase";
import { InputElementData } from "#shared/types/inputElementData";

export abstract class InputElement extends ViewElementBase
{
  private _autofocus: boolean = false;
  private _name: string       = '';
  private _id: string         = '';

  constructor(data?: InputElementData)
  {
    super();

    if (data?.autofocus)
    {
      this.setAutofocus(data.autofocus);
    }

    if (data?.name)
    {
      this.setName(data.name);
    }

    if (data?.id)
    {
      this.setId(data.id);
    }
  }

  public get autofocus(): boolean
  {
    return this._autofocus;
  }

  public get name(): string
  {
    return this._name;
  }

  public get id(): string
  {
    return this._id;
  }

  public setName(name: string): void
  {
    this._name = name;
  }

  public setId(id: string): void
  {
    this._id = id;
  }

  public setAutofocus(autofocus: boolean): void
  {
    this._autofocus = autofocus;
  }
}