<template>
  <UCard class="todo-card" variant="subtle" :ui="cardUIOptions">
    <template #header>
      <div class="todo-card__title font-semibold text-lg">{{ props.todo.title }}</div>
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

const cardUIOptions = {
  header: 'bg-primary text-secondary'
}
</script>