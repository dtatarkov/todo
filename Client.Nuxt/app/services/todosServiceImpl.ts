import { ToDosService } from "@/interfaces/todosService";
import { ToDo } from "@/interfaces/todo";
import type { ToDosOwner } from "@/interfaces/todosOwner";
import type { OverlayService } from "@/interfaces/overlayService";
import { Modal } from "@/entities/overlay/modal";
import { FormElementType } from "@/enums/formElementType";
import type { FormFactory } from "@/interfaces/formFactory";

export class TodosServiceImpl extends ToDosService
{
  constructor(
    protected owner: ToDosOwner,
    protected overlayService: OverlayService,
    protected formFactory: FormFactory
  )
  {
    super();
  }

  getAllToDos(): Ref<ToDo[]>
  {
    return this.owner.todos;
  }

  async editToDoAsync(todoId: string): Promise<void>
  {
    let todo = this.owner.getToDoById(todoId);

    if (!todo)
    {
      throw new Error(`ToDo(${ todoId }) not found`);
    }

    const form = this.formFactory.create<ToDo>();

    form.setElements({
      title: {
        type       : FormElementType.inputText,
        label      : 'Название задачи',
        placeholder: 'Введите название задачи',
      },

      description: {
        type       : FormElementType.textarea,
        label      : 'Описание задачи',
        placeholder: 'Введите описание задачи'
      },

      completionDatePlanned: {
        type : FormElementType.inputDateTime,
        label: 'Плановая дата выполнения',
      }
    });

    form.setData(todo);

    const modal   = new Modal();
    modal.title   = 'Редактирование';
    modal.content = form;

    this.overlayService.addElement(modal);
  }
}