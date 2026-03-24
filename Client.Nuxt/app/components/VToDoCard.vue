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
            @click="() => todoCard.handleEditButtonClick()"
        />
      </div>
    </template>

    <div class="todo-card__description">{{ data.description }}</div>

    <template #footer v-if="hasFooter">
      <VInfoBlock>
        <VInfoRow label="Выполнено" v-if="data.completionDateActual.length">
          <VDate :date="data.completionDateActual"/>
        </VInfoRow>

        <VInfoRow label="Выполнить до" v-else-if="data.completionDatePlanned.length">
          <VDate :date="data.completionDatePlanned"/>
        </VInfoRow>
      </VInfoBlock>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import { ToDoCard } from "~/interfaces/todoCard";

const props = defineProps<{ todoCard: ToDoCard }>();
const data = useUIElement(props.todoCard);

const cardUIOptions = {
  root  : 'rounded-sm',
  header: 'flex gap-4 items-center text-primary'
}

const hasFooter = computed(() => data.completionDateActual.length > 0 || data.completionDatePlanned.length > 0);
</script>