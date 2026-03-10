<template>
  <UCard class="todo-card">
    <template #header>
      <div class="todo-card__title">{{ props.todo.title }}</div>
    </template>
    
    <div class="todo-card__description">{{ props.todo.description }}</div>
    
    <template #footer>
      <UIInfoBlock>
        <UIInfoRow label="Выполнено" v-if="props.todo.completionDateActual">
          <UIDate :date="props.todo.completionDateActual" />
        </UIInfoRow>

        <UIInfoRow label="Запланировано" v-else>
          <UIDate :date="props.todo.completionDatePlanned" />
        </UIInfoRow>
      </UIInfoBlock>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import { ToDo } from "#shared/entities/todo";

const props = defineProps({
  todo: {
    type: ToDo,
    required: true
  }
});
</script>

<style lang="scss">
.todo-card {
  .todo-card__title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .todo-card__description {
    color: #6b7280;
    margin-bottom: 1rem;
  }
}
</style>