<template>
  <div class="ui-grid">
    <slot />
  </div>
</template>

<style lang="scss">
.ui-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(300px, 1fr));
  gap: 4px;
}
</style>