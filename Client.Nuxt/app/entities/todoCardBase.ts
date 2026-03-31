import { ToDoCard } from "~/interfaces/todoCard";
import type { ToDosService } from "~/interfaces/todosService";
import { VToDoCard } from "#components";

export class ToDoCardBase extends ToDoCard
{
  protected data = reactive({
    id                   : '',
    title                : '',
    description          : '',
    completionDatePlanned: '',
    completionDateActual : ''
  });

  readonly component = {
    setup: () =>
    {
      return () => h(VToDoCard, {
        title                : this.title,
        description          : this.description,
        completionDatePlanned: this.completionDatePlanned,
        completionDateActual : this.completionDateActual,
        onEditButtonClick    : () => this.handleEditButtonClick()
      });
    }
  }

  constructor(
    private todosService: ToDosService
  )
  {
    super();
  }

  override get id()
  {
    return this.data.id;
  }

  override get title()
  {
    return this.data.title;
  }

  override get description()
  {
    return this.data.description;
  }

  override get completionDatePlanned()
  {
    return this.data.completionDatePlanned;
  }

  override get completionDateActual()
  {
    return this.data.completionDateActual;
  }

  override set id(value: string)
  {
    this.data.id = value;
  }

  override set title(value: string)
  {
    this.data.title = value;
  }

  override set description(value: string)
  {
    this.data.description = value;
  }

  override set completionDatePlanned(value: string)
  {
    this.data.completionDatePlanned = value;
  }

  override set completionDateActual(value: string)
  {
    this.data.completionDateActual = value;
  }

  async handleEditButtonClick()
  {
    await this.todosService.editToDoAsync(this.data.id);
  }
}