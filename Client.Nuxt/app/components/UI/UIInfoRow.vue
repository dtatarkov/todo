<template>
  <div class="ui-info-row text-sm">
    <span class="ui-info-row__label">{{ label }}</span>
    
    <span class="ui-info-row__content">
      <slot />
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: true
  }
});
</script>

<style lang="scss">
.ui-info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
}

.ui-info-row__label {
  min-width: 100px;
}

.ui-info-row__content {
  text-align: right;
  flex: 1;
  margin-left: 8px;
}
</style>