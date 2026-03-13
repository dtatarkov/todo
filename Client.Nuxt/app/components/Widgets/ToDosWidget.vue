<script setup lang="ts">
import { ToDo } from "#shared/entities/todo";

const todo = new ToDo({
  title: 'Задача 1',
  description: 'Описание задачи',
  completionDatePlanned: new Date('2023-12-01'),
  completionDateActual: undefined
});
</script>

<template>
  <ToDoCard :todo="todo"/>
</template>