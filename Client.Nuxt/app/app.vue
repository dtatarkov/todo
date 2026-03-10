<template>
  <UApp>
    <ToDoCard :todo="todo" />
  </UApp>
</template>

<script setup lang="ts">
import { ToDo } from "#shared/entities/todo";

useServiceLocator();
useApplicationServices();

const todo = new ToDo();
</script>

<style lang="scss">
@use '../styles/index.scss';
</style>