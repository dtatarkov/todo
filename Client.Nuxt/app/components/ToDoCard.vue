<template>
  <UCard class="todo-card" variant="subtle" :ui="cardUIOptions">
    <template #header>
      <div class="todo-card__title font-semibold text-lg">{{ data.title }}</div>
    </template>

    <div class="todo-card__description">{{ data.description }}</div>

    <template #footer v-if="hasFooter">
      <UIInfoBlock>
        <UIInfoRow label="Выполнено" v-if="data.completionDateActual">
          <UIDate :date="data.completionDateActual"/>
        </UIInfoRow>

        <UIInfoRow label="Выполнить до" v-else-if="data.completionDatePlanned">
          <UIDate :date="data.completionDatePlanned"/>
        </UIInfoRow>
      </UIInfoBlock>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import { ToDoViewModel } from "#shared/interfaces/todoViewModel";

type Props = { 
  todoId: string;
}

const props = defineProps<Props>();

const todoViewModel = getService(ToDoViewModel);
todoViewModel.setToDoId(props.todoId);

const data = useViewModel(todoViewModel);

const cardUIOptions = {
  root  : 'rounded-sm',
  header: 'bg-primary text-secondary'
}

const hasFooter = computed(() => data.value.completionDateActual != undefined || data.value.completionDatePlanned != undefined);
</script>