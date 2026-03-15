<template>
  <UCard class="todo-card" variant="subtle" :ui="cardUIOptions">
    <template #header>
      <div class="todo-card__title font-semibold text-lg grow">{{ data.title }}</div>

      <div class="todo-card__actions">
        <UButton
            class="cursor-pointer"
            variant="link"
            color="secondary"
            icon="i-heroicons-pencil-square"
            size="sm"
            @click="() => viewmodel.handleEditButtonClick()"
        />
      </div>
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

const viewmodel = getService(ToDoViewModel);
viewmodel.setToDoId(props.todoId);

const data = useViewModel(viewmodel);

const cardUIOptions = {
  root  : 'rounded-sm',
  header: 'flex gap-4 items-center bg-primary text-secondary'
}

const hasFooter = computed(() => data.completionDateActual != undefined || data.completionDatePlanned != undefined);
</script>