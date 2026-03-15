<script setup lang="ts">
import { OverlayViewModel } from "#shared/interfaces/overlayViewModel";

const viewmodel = getService(OverlayViewModel);
const data = useViewModel(viewmodel);
</script>

<template>
  <component v-for="element in data.elements" :key="element.id" :is="element.getVNode()" />
</template>