<template>
  <UApp :locale="locale">
    <NuxtPage />
    <VOverlay />
  </UApp>
</template>

<script setup lang="ts">
import * as locales from '@nuxt/ui/locale';

useServiceLocator();
useApplicationServices();

const config = useRuntimeConfig();
const locale = (locales as any)[config.public.locale];
</script>