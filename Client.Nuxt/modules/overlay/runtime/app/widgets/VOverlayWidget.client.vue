<script setup lang="ts">
const overlayService  = getService(OverlayService);
const overlayElements = overlayService.getElementsRef();
</script>

<template>
  <component v-for="element in overlayElements" :key="element.id" :is="element.component" />
</template>