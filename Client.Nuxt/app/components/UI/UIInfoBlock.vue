<template>
  <div class="ui-info-block">
    <slot />
  </div>
</template>

<style lang="scss">
.ui-info-block {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>