import { ToDosService } from "@/interfaces/todosService";
import { ToDo } from "@/interfaces/todo";
import type { ToDosOwner } from "@/interfaces/todosOwner";
import { ToDoBase } from "@/entities/todoBase";
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

  async getAllToDosAsync(): Promise<ToDo[]>
  {
    await this.owner.init();
    const todos = this.owner.getAllToDos();

    return todos;
  }

  async getToDoByIdAsync(todoId: string): Promise<ToDo | undefined>
  {
    await this.owner.init();
    let todo = this.owner.getToDoById(todoId);
    
    return todo;
  }

  async getToDoByIdOrDefaultAsync(todoId: string): Promise<ToDo>
  {
    let todo = await this.getToDoByIdAsync(todoId);

    if (!todo)
    {
      todo = new ToDoBase();
    }

    return todo;
  }

  async editToDoAsync(todoId: string): Promise<void> {
    let todo = await this.getToDoByIdAsync(todoId);
    
    if(!todo)
    {
      throw new Error(`ToDo(${todoId}) not found`);
    }
    
    const form = this.formFactory.create<ToDo>();
    
    form.setElements({
      title: {
        type: FormElementType.inputText,
        label: 'Название задачи',
        placeholder: 'Введите название задачи',
      },
      
      description: {
        type: FormElementType.textarea,
        label: 'Описание задачи',
        placeholder: 'Введите описание задачи'
      },
      
      completionDatePlanned: {
        type: FormElementType.inputDateTime,
        label: 'Плановая дата выполнения',
      }
    });
    
    form.setData(todo);

    const modal = new Modal();
    modal.setTitle('Редактирование');
    modal.setContent(form);
    
    this.overlayService.addElement(modal);
  }
}