<script setup lang="ts">
import { OverlayService } from "~/interfaces/overlayService";

const overlayService = getService(OverlayService);
const overlayElements = overlayService.getElementsRef();
</script>

<template>
  <component v-for="element in overlayElements" :key="element.id" :is="element.getVNode()" />
</template>