<template>
  <UCard class="todo-card" variant="subtle" :ui="cardUIOptions">
    <template #header>
      <div class="todo-card__title font-semibold text-lg grow">{{ card.title }}</div>

      <div class="todo-card__actions">
        <UButton
            class="cursor-pointer"
            variant="link"
            color="secondary"
            icon="i-heroicons-pencil-square"
            size="sm"
            @click="() => card.handleEditButtonClick()"
        />
      </div>
    </template>

    <div class="todo-card__description">{{ card.description }}</div>

    <template #footer v-if="hasFooter">
      <VInfoBlock>
        <VInfoRow label="Выполнено" v-if="card.completionDateActual.length">
          <VDate :date="card.completionDateActual"/>
        </VInfoRow>

        <VInfoRow label="Выполнить до" v-else-if="card.completionDatePlanned.length">
          <VDate :date="card.completionDatePlanned"/>
        </VInfoRow>
      </VInfoBlock>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import { ToDoCard } from "~/interfaces/todoCard";

const props = defineProps<{ card: ToDoCard }>();

const cardUIOptions = {
  root  : 'rounded-sm',
  header: 'flex gap-4 items-center text-primary'
}

const hasFooter = computed(() => props.card.completionDateActual.length > 0 || props.card.completionDatePlanned.length > 0);
</script>