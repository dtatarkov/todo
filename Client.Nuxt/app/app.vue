<template>
  <UApp :locale="locale">
    <NuxtPage />
    <VOverlayWidget />
  </UApp>
</template>

<script setup lang="ts">
import * as locales from '@nuxt/ui/locale';

useApplicationServices();

const config = useRuntimeConfig();
const locale = (locales as any)[config.public.locale];
</script>