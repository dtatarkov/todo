import { ToDosRepository } from "#shared/interfaces/todosRepository";
import { ToDoGetDto } from "#shared/types/toDoGetDto";

export class ToDosRepositoryImpl extends ToDosRepository {
  private config = useRuntimeConfig();
  
  getAllToDosAsync(): Promise<ToDoGetDto[]>
  {
    return $fetch(`${this.config.public.apiBaseUrl}/todos`, {
      method: 'GET',
      credentials: 'include'
    });
  }  
}