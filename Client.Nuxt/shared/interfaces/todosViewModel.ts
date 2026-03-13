import { ViewModel } from "#shared/interfaces/viewmodel";
import { ToDo } from "#shared/interfaces/todo";

export type TodosViewModelData = {
  todos: ToDo[]
}

export abstract class TodosViewModel extends ViewModel<TodosViewModelData> { }