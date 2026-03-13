<template>
  <UCard class="todo-card" variant="subtle" :ui="cardUIOptions">
    <template #header>
      <div class="todo-card__title font-semibold text-lg">{{ props.todo.title }}</div>
    </template>
    
    <div class="todo-card__description">{{ props.todo.description }}</div>
    
    <template #footer v-if="hasFooter">
      <UIInfoBlock>
        <UIInfoRow label="Выполнено" v-if="props.todo.completionDateActual">
          <UIDate :date="props.todo.completionDateActual" />
        </UIInfoRow>

        <UIInfoRow label="Выполнить до" v-else-if="props.todo.completionDatePlanned">
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
  root: 'rounded-sm',
  header: 'bg-primary text-secondary'
}

const hasFooter = computed(() => props.todo.completionDateActual != undefined || props.todo.completionDatePlanned != undefined)
</script>