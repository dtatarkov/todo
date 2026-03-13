<template>
  <span class="ui-date" v-if="hasDate">
    {{ formattedDate }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { DatesService } from "#shared/interfaces/datesService";

const datesService = getService(DatesService);

const props = defineProps({
  date: {
    type: Date,
  }
});

const hasDate = computed(() => datesService.isDate(props.date));
const formattedDate = computed(() => datesService.formatDateOptional(props.date));
</script>