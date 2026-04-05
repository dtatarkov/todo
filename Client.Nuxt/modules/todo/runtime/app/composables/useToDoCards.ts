import { ToDoElementsFactory } from "../interfaces/todoElementsFactory";
import { ToDosService } from "../interfaces/todosService";

export async function useToDoCards()
{
  const todosService        = getService(ToDosService);
  const todoElementsFactory = getService(ToDoElementsFactory);

  await todosService.updateToDosAsync();

  const todos = todosService.getAllToDosRef();
  const cards = computed(() => todos.value.map(todo => todoElementsFactory.createToDoCard(todo)));

  return {
    cards,
  }
}