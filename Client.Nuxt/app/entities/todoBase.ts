import { ToDo } from "@/interfaces/todo";

export class ToDoBase extends ToDo
{
  private _id: string           = '';
  private _title: string        = '';
  private _description: string  = '';
  private _completionDatePlanned: Date | undefined;
  private _completionDateActual: Date | undefined;

  constructor(data?: Partial<ToDo>) {
    super();
    
    if (data) {
      this._id = data.id || this._id;
      this._title = data.title || this._title;
      this._description = data.description || this._description;
      this._completionDatePlanned = data.completionDatePlanned;
      this._completionDateActual = data.completionDateActual;
    }
  }


  get id(): string
  {
    return this._id;
  }


  get title(): string
  {
    return this._title;
  }


  get description(): string
  {
    return this._description;
  }


  get completionDatePlanned(): Date | undefined
  {
    return this._completionDatePlanned;
  }


  get completionDateActual(): Date | undefined
  {
    return this._completionDateActual;
  }


  set id(value: string)
  {
    this._id = value;
  }


  set title(value: string)
  {
    this._title = value;
  }


  set description(value: string)
  {
    this._description = value;
  }


  set completionDatePlanned(value: Date | undefined)
  {
    this._completionDatePlanned = value;
  }


  set completionDateActual(value: Date | undefined)
  {
    this._completionDateActual = value;
  }
}