<script setup lang="ts">
import { TodosViewModel } from "@/interfaces/todosViewModel";

const viewmodel = getService(TodosViewModel);
const data = useViewModel(viewmodel);
</script>

<template>
  <div class="p-4">
    <VGrid>
      <VToDoCard v-for="todo of data.todos" :key="todo.id" :todo-id="todo.id" />
    </VGrid>
  </div>
</template>