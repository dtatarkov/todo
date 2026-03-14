export abstract class ToDosRepository {
  abstract getAllToDosAsync(): Promise<ToDoGetDto[]>;
}