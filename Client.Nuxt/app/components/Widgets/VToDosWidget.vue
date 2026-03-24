<script setup lang="ts">
import { TodosService } from "~/interfaces/todosService";
import type { ToDoCardData } from "~/interfaces/todoCard";
import { ToDoElementsFactory } from "~/interfaces/todoElementsFactory";
import { ToDoCardDataMapper } from "~/interfaces/todoCardDataMapper";

const todosService = getService(TodosService);
const todoElementsFactory = getService(ToDoElementsFactory);
const todoCardDataMapper = getService(ToDoCardDataMapper);

const { data } = useAsyncData(async () =>
{
  const todos = await todosService.getAllToDosAsync();  
  const cardsData = todos.map(todo => todoCardDataMapper.map(todo));
  
  const result = {
    cardsData
  }
  
  return result;
}, {
  default: () => ({ cardsData: new Array<ToDoCardData>() })
});

const todoCards = computed(() => data.value.cardsData.map(cardData => todoElementsFactory.createToDoCard(cardData)));
</script>

<template>
  <div class="p-4">
    <VGrid>
      <VToDoCard v-for="card of todoCards" :key="card.data.id" :todo-card="card" />
    </VGrid>
  </div>
</template>