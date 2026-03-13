<script setup lang="ts">
import { TodosViewModel } from "#shared/interfaces/todosViewModel";

const viewmodel = getService(TodosViewModel);
const data = useViewModel(viewmodel);
</script>

<template>
  <ToDoCard v-for="todo of data.todos" :key="todo.id" :todo="todo" />
</template>