<template>
  <UApp>
    <NuxtPage />
    <UIOverlay />
  </UApp>
</template>

<script setup lang="ts">
useServiceLocator();
useApplicationServices();
</script>