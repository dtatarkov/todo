<script setup lang="ts">
import { TodosViewModel } from "#shared/interfaces/todosViewModel";

const viewmodel = getService(TodosViewModel);
const data = useViewModel(viewmodel);
</script>

<template>
  <div class="todos-widget">
    <UIGrid>
      <ToDoCard v-for="todo of data.todos" :key="todo.id" :todo="todo" />
    </UIGrid>
  </div>
</template>

<style lang="scss">
.todos-widget {
  padding: 16px;
}
</style>