<script setup lang="ts">
import { TodosService } from "~/interfaces/todosService";
import { ToDoElementsFactory } from "~/interfaces/todoElementsFactory";
import { ToDoCardDataMapper } from "~/interfaces/todoCardDataMapper";

const todosService = getService(TodosService);
const todoElementsFactory = getService(ToDoElementsFactory);
const todoCardDataMapper = getService(ToDoCardDataMapper);

const { data: todos } = useViewAsyncData(() => todosService.getAllToDosAsync(), []);
const cardsData = computed(() => todos.value.map(todo => todoCardDataMapper.map(todo)));
const cards = computed(() => cardsData.value.map(cardData => todoElementsFactory.createToDoCard(cardData)));
</script>

<template>
  <div class="p-4">
    <VGrid>
      <VToDoCard v-for="card of cards" :key="card.data.id" :todo-card="card" />
    </VGrid>
  </div>
</template>