<script setup lang="ts">
import { TodosService } from "~/interfaces/todosService";
import { ToDoElementsFactory } from "~/interfaces/todoElementsFactory";

const todosService        = getService(TodosService);
const todoElementsFactory = getService(ToDoElementsFactory);

const { data: todos } = useViewAsyncData(() => todosService.getAllToDosAsync(), []);
const cards           = computed(() => todos.value.map(todo => todoElementsFactory.createToDoCard(todo)))
</script>

<template>
  <div class="p-4">
    <VGrid>
      <component v-for="card of cards" :key="card.id" :is="card.getVNode()"/>
    </VGrid>
  </div>
</template>