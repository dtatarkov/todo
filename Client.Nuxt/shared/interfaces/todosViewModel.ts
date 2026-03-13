import { ViewModel } from "#shared/interfaces/viewmodel";
import { ToDo } from "#shared/entities/todo";

export type TodosViewModelData = {
  todos: ToDo[]
}

export abstract class TodosViewModel extends ViewModel<TodosViewModelData> { }