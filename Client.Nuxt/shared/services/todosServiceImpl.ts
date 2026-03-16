import { TodosService } from "#shared/interfaces/todosService";
import { ToDo } from "#shared/interfaces/todo";
import type { ToDosOwner } from "#shared/interfaces/todosOwner";
import { ToDoBase } from "#shared/entities/todoBase";
import type { OverlayService } from "#shared/interfaces/overlayService";
import { Modal } from "#shared/entities/modal";
import { Form } from "#shared/entities/form";

export class TodosServiceImpl extends TodosService
{
  constructor(
    protected owner: ToDosOwner,
    protected overlayService: OverlayService
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
    
    const form = new Form<ToDo>();
    
    form.setElements({
      title: {
        type: 'input-text',
        label: 'Название задачи',
        placeholder: 'Введите название задачи'
      }
    })

    const modal = new Modal();
    modal.setTitle('Редактирование');
    modal.setContent(form);
    
    this.overlayService.addElement(modal);
  }
}