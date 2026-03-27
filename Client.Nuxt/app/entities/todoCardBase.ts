import { ToDoCard } from "~/interfaces/todoCard";
import type { TodosService } from "~/interfaces/todosService";
import type { RenderFunction } from "~/types/renderFunction";
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

  constructor(
    private todosService: TodosService
  )
  {
    super();
  }

  override get id() {
    return this.data.id;
  }

  override get title() {
    return this.data.title;
  }

  override get description() {
    return this.data.description;
  }

  override get completionDatePlanned() {
    return this.data.completionDatePlanned;
  }

  override get completionDateActual() {
    return this.data.completionDateActual;
  }

  override set id(value: string) {
    this.data.id = value;
  }

  override set title(value: string) {
    this.data.title = value;
  }

  override set description(value: string) {
    this.data.description = value;
  }

  override set completionDatePlanned(value: string) {
    this.data.completionDatePlanned = value;
  }

  override set completionDateActual(value: string) {
    this.data.completionDateActual = value;
  }

  override getVNode(): { setup: () => RenderFunction }
  {
    return {
      setup: () =>
      {
        return () => h(VToDoCard, { card: this });
      }
    }
  }

  async handleEditButtonClick()
  {
    await this.todosService.editToDoAsync(this.data.id);
  }
}